import { Component, OnInit } from '@angular/core';
import {PlantService} from "../../services/plant.service";
import {Transaction} from "../../models/transaction";
import {TransactionService} from "../../services/tranasaction.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  sortedTransactions: Transaction[] = [];

  constructor(private plantService: PlantService, private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.getTransactions();
    this.getFilteredTransactions();
    this.getSortedTransactions();
  }

  getTransactions(): void {
    this.transactionService
      .getTransactions()
      .subscribe((transactions) => (this.transactions = transactions));
  }

  getFilteredTransactions():void{
   this.filteredTransactions = this.transactionService.getTransactionsBySold(this.transactions);
  }

  getSortedTransactions():void{
    this.sortedTransactions = this.transactionService.sortTransactionsByTotalPrice(this.transactions);
  }

  getTransactionTotalPrice(transactionToBeChecked: Transaction): number{
    return this.transactionService.getTransactionTotalPrice(transactionToBeChecked);
  }

}
