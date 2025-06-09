import { Command } from "./ICommand";

export abstract class CommandHandler {
  protected nextHandler?: CommandHandler;

  setNext(handler: CommandHandler): CommandHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(command: Command): void {
    if (this.canHandle(command)) {
      this.execute(command);
    } else if (this.nextHandler) {
      this.nextHandler.handle(command);
    } else {
      console.error("Command not handled");
    }
  }

  protected abstract canHandle(command: Command): boolean;
  protected abstract execute(command: Command): void;
}
