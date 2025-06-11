import { TransactionFacade } from "../facade/TransactionFacade";

export class TransactionServiceProxy {
  private failureCount = 0;
  private readonly threshold = 3;
  private readonly timeout = 5000;
  private state: "CLOSED" | "OPEN" | "HALF_OPEN" = "CLOSED";
  private lastFailureTime = 0;

  constructor(private readonly facade: TransactionFacade) {}

  execute(accountId: string, amount: number, type: "credit" | "debit") {
    const now = Date.now();

    if (this.state === "OPEN" && now - this.lastFailureTime < this.timeout) {
      console.log("Circuit is OPEN. Execution blocked.");
      return;
    }

    if (this.state === "OPEN") {
      this.state = "HALF_OPEN";
    }

    try {
      this.facade.createTransaction(accountId, amount, type);
      this.failureCount = 0;
      this.state = "CLOSED";
    } catch (error) {
      this.failureCount++;
      this.lastFailureTime = now;
      console.log("Service failed:", error);

      if (this.failureCount >= this.threshold) {
        this.state = "OPEN";
        console.log("Circuit is now OPEN");
      }
    }
  }
}
