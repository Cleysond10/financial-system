import { Handler, TransactionContext } from "./Handler";

export class BalanceValidator extends Handler {
  protected process(context: TransactionContext): void {
    const account = context.accountRepo.findById(context.accountId);
    if (!account) throw new Error("Account not found");

    if (context.type === "debit" && account.balance < context.amount) {
      throw new Error("Insufficient balance for debit transaction");
    }
  }
}
