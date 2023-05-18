import { Component } from '@angular/core';
import {Transaction} from "../../../models/transaction";
import {TransactionService} from "../../../services/tranasaction.service";


@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent {

  selectedTransaction?: Transaction;
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {

  }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions;
    });
  }

  onSelect(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.transactionService.getTransaction(transaction.id)
  }
}
