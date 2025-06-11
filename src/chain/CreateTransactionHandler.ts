import { Handler } from "./Handler";
import { Command } from "../commands/ICommand";
import { CreateTransactionCommand } from "../commands/CreateTransactionCommand";

export class CreateTransactionHandler extends Handler {
  protected canHandle(command: Command): boolean {
    return command instanceof CreateTransactionCommand;
  }

  protected process(command: Command): void {
    (command as CreateTransactionCommand).execute();
  }
}
