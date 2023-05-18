import {Component, Input} from '@angular/core';
import {Transaction} from "../../../../models/transaction";
import {TransactionService} from "../../../../services/tranasaction.service";

@Component({
  selector: 'app-transactions-list-preview',
  templateUrl: './transactions-list-preview.component.html',
  styleUrls: ['./transactions-list-preview.component.scss']
})
export class TransactionsListPreviewComponent {
  transactions: Transaction[] = [];

  //The input decorator helps us to get the value or the path from the navbar, when we call the component.
  @Input()  relativeRoutePath?: string;

  constructor(private transactionService: TransactionService) {

  }
  ngOnInit(){
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions;
    });
  }
}
