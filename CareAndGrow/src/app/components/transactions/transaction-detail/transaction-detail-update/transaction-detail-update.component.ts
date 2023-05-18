import { Component } from '@angular/core';
import {Transaction} from "../../../../models/transaction";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {MessagesService} from "../../../../services/messages.service";
import {TransactionService} from "../../../../services/tranasaction.service";

@Component({
  selector: 'app-transaction-detail-update',
  templateUrl: './transaction-detail-update.component.html',
  styleUrls: ['./transaction-detail-update.component.scss']
})
export class TransactionDetailUpdateComponent {
  transaction?: Transaction;
  plantsID?: number[];

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private location: Location,
    private messageService: MessagesService,
  ) {}

  ngOnInit(): void {
    this.getTransaction();
    this.getAllPlantsID();
  }

  getTransaction(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.transactionService.getTransaction(id).subscribe((transaction) => {
        this.transaction = transaction;
      });
    });
  }

  getAllPlantsID(): void{
    this.plantsID = this.transactionService.getAllPlantsID();
  }

  onUpdate(): void {
    try {
      this.transactionService.updateTransaction(this.transaction).subscribe(() => {
        this.messageService.add(
          `TransactionDetailUpdateComponent: updated ${this.transaction?.id}`
        );
      });
    } catch (error) {
      this.messageService.add(
        `TransactionDetailUpdateComponent: error updating ${this.transaction?.id}`
      );
    }
  }

  onBack(): void {
    this.location.back();
  }
}
