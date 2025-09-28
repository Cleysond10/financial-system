import { Transaction } from "./Transaction";

export interface ITransactionRepository {
  save(transaction: Transaction): void;
  findByAccountId(accountId: string): Transaction[];
  findAll(): Transaction[];
}
