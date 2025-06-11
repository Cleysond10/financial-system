import { Command } from "./ICommand";
import { TransactionServiceProxy } from "../proxy/TransactionServiceProxy";

export class CreateTransactionCommand implements Command {
  constructor(
    private readonly proxy: TransactionServiceProxy,
    private readonly accountId: string,
    private readonly amount: number,
    private readonly type: "credit" | "debit"
  ) {}

  execute(): void {
    this.proxy.execute(this.accountId, this.amount, this.type);
  }
}
