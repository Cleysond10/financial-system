export type TransactionType = "credit" | "debit";

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly amount: number,
    public readonly type: TransactionType,
    public readonly date: Date = new Date()
  ) {}
}
