import { AccountRepository } from "../domain/account/AccountRepository";
import { TransactionRepository } from "../domain/transaction/TransactionRepository";
import { Transaction } from "../domain/transaction/Transaction";
import { SnapshotManager } from "../memento/SnapshotManager";
import { v4 as uuid } from "uuid";

export class TransactionFacade {
  constructor(
    private readonly accountRepo: AccountRepository,
    private readonly transactionRepo: TransactionRepository,
    private readonly snapshotManager: SnapshotManager
  ) {}

  createTransaction(accountId: string, amount: number, type: "credit" | "debit") {
    const account = this.accountRepo.findById(accountId);
    if (!account) throw new Error("Account not found");

    if (type === "credit") {
      account.credit(amount);
    } else {
      account.debit(amount);
    }

    const transaction = new Transaction(uuid(), accountId, amount, type);
    this.transactionRepo.save(transaction);
    this.accountRepo.save(account);

    // Salva snapshot após a transação
    this.snapshotManager.saveSnapshot(account.createSnapshot());
  }
}
