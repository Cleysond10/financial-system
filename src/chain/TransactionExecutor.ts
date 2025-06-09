import { Handler, TransactionContext } from "./Handler";
import { Transaction } from "../domain/transaction/Transaction";
import { v4 as uuidv4 } from "uuid";

export class TransactionExecutor extends Handler {
  protected process(context: TransactionContext): void {
    const account = context.accountRepo.findById(context.accountId);
    if (!account) throw new Error("Account not found");

    if (context.snapshotManager) {
      context.snapshotManager.save(account);
    }

    if (context.type === "credit") {
      account.credit(context.amount);
    } else {
      account.debit(context.amount);
    }

    const transaction = new Transaction(uuidv4(), context.accountId, context.amount, context.type);
    context.transactionRepo.save(transaction);
    context.accountRepo.save(account);
  }
}
