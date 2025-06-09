import { AccountRepository } from "../domain/account/AccountRepository";
import { TransactionRepository } from "../domain/transaction/TransactionRepository";
import { SnapshotManager } from "../memento/SnapshotManager";

export type TransactionContext = {
  accountId: string;
  amount: number;
  type: "credit" | "debit";
  accountRepo: AccountRepository;
  transactionRepo: TransactionRepository;
  snapshotManager?: SnapshotManager;
};

export abstract class Handler {
  protected nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(context: TransactionContext): void {
    this.process(context);
    if (this.nextHandler) {
      this.nextHandler.handle(context);
    }
  }

  protected abstract process(context: TransactionContext): void;
}
