import { Account } from "../domain/account/Account";

export class AccountSnapshot {
  constructor(
    public readonly accountId: string,
    public readonly balance: number
  ) {}

  restore(account: Account): void {
    (account as any)._balance = this.balance;
  }
}
