import { Command } from "./ICommand";
import { TransactionFacade } from "../facade/TransactionFacade";

export class CreateTransactionCommand implements Command {
  constructor(
    private readonly facade: TransactionFacade,
    private readonly accountId: string,
    private readonly amount: number,
    private readonly type: "credit" | "debit"
  ) {}

  execute(): void {
    this.facade.createTransaction(this.accountId, this.amount, this.type);
  }
}
