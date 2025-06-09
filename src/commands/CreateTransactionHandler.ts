import { Command } from "./ICommand";
import { CommandHandler } from "./CommandHandler";
import { CreateTransactionCommand } from "./CreateTransactionCommand";

export class CreateTransactionHandler extends CommandHandler {
  handle(command: Command): void {
    if (this.canHandle(command)) {
      this.execute(command);
    } else if (this.nextHandler) {
      this.nextHandler.handle(command);
    } else {
      console.error("Command not handled");
    }
  }

  protected canHandle(command: Command): boolean {
    return command instanceof CreateTransactionCommand;
  }

  protected execute(command: Command): void {
    (command as CreateTransactionCommand).execute();
  }
}
