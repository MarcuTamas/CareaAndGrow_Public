import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MessagesService} from "./messages.service";
import {Transaction} from "../models/transaction";
import {PlantService} from "./plant.service";
import {PLANTS} from "../../mockObject/mock-plants";
import {TRANSACTIONS} from "../../mockObject/mock-transactions";
import {PrivacyService} from "./privacy.service";

// import {TRANSACTIONS} from "../../mockObject/mock-transactions";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionsKey = 'transactions';
  private transactions: Transaction[] = [];
  private privacyConsent: boolean = this.privacyService.getPrivacyConsent();

  constructor(private messagesService: MessagesService, private privacyService: PrivacyService, private plantService: PlantService) {
    if (this.privacyConsent) {
      this.getTransactionsFromLocalStorage();
      this.initializeMockTransactions();
    }
  }

  private getTransactionsFromLocalStorage() {
    const transactions = localStorage.getItem(this.transactionsKey)
    if (transactions) {
      this.transactions = JSON.parse(transactions);
    }
  }

  private setTransactionsFromLocalStorage() {
    if(this.privacyConsent){
      localStorage.setItem(this.transactionsKey, JSON.stringify(this.transactions));  
    }
  }

  private initializeMockTransactions() {
    const transactionsFromLocalStorage = localStorage.getItem(this.transactionsKey);
    if (transactionsFromLocalStorage) {
      this.transactions = JSON.parse(transactionsFromLocalStorage);
    } else {
      // Populate plants array with mock plants
      this.transactions = TRANSACTIONS;

      // Store plants in local storage
      localStorage.setItem(this.transactionsKey, JSON.stringify(this.transactions));
    }
  }

  getTransactions(): Observable<Transaction[]> {
    const transactions = of(this.transactions);
    return transactions;
  }

  getTransaction(id: number): Observable<Transaction> {
    const transaction = this.transactions.find((h) => h.id === id) as Transaction;
    this.messagesService.add(
      `TransactionService: fetched transaction id=${id} - ${Date.now()}`
    );
    return of(transaction);
  }

  addTransaction(transaction?: Transaction): Observable<Transaction> {
    if (!transaction || !transaction.id) {
      this.messagesService.add(
        `TransactionService: transaction is undefined - ${Date.now()}`
      );
      throw new Error('transaction is undefined');
    }

    transaction.id = +transaction.id;
    transaction.plantID = +transaction.plantID;

    if (this.transactions.find((h) => h.id === transaction.id)) {
      this.messagesService.add(
        `TransactionService: transaction with id=${transaction.id} already exists - ${Date.now()}`
      );
      throw new Error('Transaction with this id already exists');
    }

    //Checking if any plant with given ID exist or not.
    if (!this.getAllPlantsID().find((n) => n === transaction.plantID)) {
      this.messagesService.add(
        `TransactionService: plant to be transacted with id ${transaction.plantID} dose not exists - ${Date.now()}`
      );
      throw new Error('Plant to be transacted dose not exit');
    }

    this.transactions.push(transaction);
    this.setTransactionsFromLocalStorage();
    this.messagesService.add(
      `TransactionService: added transaction id=${transaction.id} - ${Date.now()}`
    );
    return of(transaction);
  }

  updateTransaction(transactionToBeUpdated?: Transaction): Observable<Transaction> {

    //We had to check if plant is undefined first.
    if (!transactionToBeUpdated) {
      this.messagesService.add(
        `TransactionService: transaction is undefined - ${Date.now()}`
      );
      throw new Error('Transaction is undefined');
    }

    transactionToBeUpdated.id = +transactionToBeUpdated.id;
    transactionToBeUpdated.plantID = +transactionToBeUpdated.plantID;

    const transactionIndex = this.transactions.findIndex((foundedTransaction) =>
      foundedTransaction.id === transactionToBeUpdated.id);

    //Check if the transaction exist in the array.
    if (transactionIndex === -1) {
      this.messagesService.add(
        `TransactionService: transaction with id ${transactionToBeUpdated.id} does not exist - ${Date.now()}`
      );
      throw new Error('Transaction with given id does not exist');
    }

    //Checking if any plant with given ID exist or not.
    if (!this.getAllPlantsID().find((n) => n === transactionToBeUpdated.plantID)) {
      this.messagesService.add(
        `TransactionService: plant to be transacted with id ${transactionToBeUpdated.id} dose not exists - ${Date.now()}`
      );
      throw new Error('Plant to be transacted dose not exit');
    }

    this.transactions[transactionIndex] = transactionToBeUpdated;
    this.setTransactionsFromLocalStorage();
    this.messagesService.add(
      `TransactionService: updated transaction with id ${transactionToBeUpdated.id} - ${Date.now()}`
    );

    return of(transactionToBeUpdated);
  }

  deleteTransaction(transactionID: number): Observable<void> {
    const transactionIndex = this.transactions.findIndex((h) => h.id === transactionID);

    if (transactionIndex === -1) {
      this.messagesService.add(
        `TransactionService: transaction with id=${transactionID} does not exist - ${Date.now()}`
      );
      throw new Error('Transaction with this id does not exist');
    }

    this.transactions.splice(transactionIndex, 1);
    this.setTransactionsFromLocalStorage();
    this.messagesService.add(
      `TransactionService: deleted transaction id=${transactionID} - ${Date.now()}`
    );

    return of(undefined);
  }

  getTransactionsBySold(transactions: Transaction[]): Transaction[] {
    return transactions.filter(transaction => transaction.soldAmount > 0);
  }

  sortTransactionsByTotalPrice(transactions: Transaction[]): Transaction[] {
    const sortedTransactions =
      transactions.sort((a, b) => {
        const totalPriceA = (a.soldAmount * a.plantSoldPrice) - a.plantBoughtPrice;
        const totalPriceB = (b.soldAmount * b.plantSoldPrice) - b.plantBoughtPrice;

        if (totalPriceA < totalPriceB) {
          return 1;
        } else if (totalPriceA > totalPriceB) {
          return -1;
        } else {
          return 0;
        }
      });

    return sortedTransactions;
  }

  getTransactionTotalPrice(transactionToCheck: Transaction): number {
    return (transactionToCheck.soldAmount * transactionToCheck.plantSoldPrice) - transactionToCheck.plantBoughtPrice;
  }

  getTransactionsNumber(): number {
    return this.transactions.length;

  }

  getAllPlantsID(): number[] {
    const plantsID = this.plantService.getPlantsID();

    if (plantsID) {
      return plantsID;
    }

    this.messagesService.add(
      `TransactionService:  error fetching any plant id - ${Date.now()}`
    );

    throw Error('TransactionService: error fetching any plant id.')
  }

}
