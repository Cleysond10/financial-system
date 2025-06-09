import { TransactionRepository } from "../domain/transaction/TransactionRepository";
import { Transaction } from "../domain/transaction/Transaction";

export class GetAccountTransactionsQuery {
  constructor(private readonly repo: TransactionRepository) {}

  execute(accountId: string): Transaction[] {
    return this.repo.findByAccountId(accountId);
  }
}
