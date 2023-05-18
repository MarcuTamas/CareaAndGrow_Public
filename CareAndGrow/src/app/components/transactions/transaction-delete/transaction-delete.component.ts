import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {TransactionService} from "../../../services/tranasaction.service";
import {Transaction} from "../../../models/transaction";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-transaction-delete',
  templateUrl: './transaction-delete.component.html',
  styleUrls: ['./transaction-delete.component.scss'],
})
export class TransactionDeleteComponent {
  // id?: number;
  transaction?: Transaction;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private location: Location,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    // this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTransaction();
  }

  getTransaction(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.transactionService.getTransaction(id).subscribe((transaction) =>
        this.transaction = transaction);
    });
  }

  onConfirm(): void {
    if (this.transaction) {
      this.transactionService.deleteTransaction(this.transaction.id).subscribe(() => {
        this.messageService.add('TransactionDeleteComponent: deleted plant care with id ' + this.transaction?.id)
        this.location.back();
      });
    }
  }

  onCancel(): void {
    this.location.back();
  }
}
