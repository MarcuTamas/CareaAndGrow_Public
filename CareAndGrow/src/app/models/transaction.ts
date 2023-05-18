export interface Transaction {
  id: number;

  plantID: number;
  plantBoughtPrice: number;
  plantSoldPrice: number;

  soldAmount: number;
  stock: number;

  transactionDate: Date;
}
