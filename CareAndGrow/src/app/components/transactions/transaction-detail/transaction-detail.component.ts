import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Transaction} from "../../../models/transaction";
import {TransactionService} from "../../../services/tranasaction.service";

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent {
  transaction?: Transaction;
  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.transactionService.getTransaction(id).subscribe((transaction) =>
        this.transaction = transaction);
    });
  }

  onBack(): void {
    this.location.back();
  }
}
