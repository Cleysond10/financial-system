import { ITransactionRepository } from "./ITransactionRepository";
import { Transaction } from "./Transaction";

export class TransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  save(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  findByAccountId(accountId: string): Transaction[] {
    return this.transactions.filter(t => t.accountId === accountId);
  }

  findAll(): Transaction[] {
    return this.transactions;
  }
}
