import { Command } from "../commands/ICommand";

export abstract class Handler {
  protected nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(command: Command): void {
    if (this.canHandle(command)) {
      this.process(command);
    } else if (this.nextHandler) {
      this.nextHandler.handle(command);
    } else {
      console.error("Command not handled");
    }
  }

  protected abstract canHandle(command: Command): boolean;
  protected abstract process(command: Command): void;
}
