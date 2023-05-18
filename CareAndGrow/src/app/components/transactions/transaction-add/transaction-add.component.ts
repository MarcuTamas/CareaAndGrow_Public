import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MessagesService } from 'src/app/services/messages.service';
import {Transaction} from "../../../models/transaction";
import {TransactionService} from "../../../services/tranasaction.service";

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss'],
})
export class TransactionAddComponent {
  transaction?: Transaction = {
    id: 1,
    plantID: 1,
    plantBoughtPrice: 0,
    plantSoldPrice: 0,
    soldAmount: 0,
    stock: 0,
    transactionDate: new Date()
  };

  plantsID?: number[];

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private messageService: MessagesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAllPlantsID();
  }

  getAllPlantsID(): void{
    this.plantsID = this.transactionService.getAllPlantsID();
  }


  onAdd(): void {
    try {
      this.transactionService.addTransaction(this.transaction).subscribe(() => {
        this.messageService.add(
          `TransactionAddComponent: added ${this.transaction?.id}`
        );
      });
    } catch (error) {
      this.messageService.add(
        `TransactionAddComponent: error adding ${this.transaction?.id}`
      );
    }
  }

  onBack(): void {
    this.location.back();
  }
}
