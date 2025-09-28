import { IAccountRepository } from "./IAccountRepository";
import { Account } from "./Account";

export class AccountRepository implements IAccountRepository {
  private accounts: Map<string, Account> = new Map();

  save(account: Account): void {
    this.accounts.set(account.id, account);
  }

  findById(id: string): Account | undefined {
    return this.accounts.get(id);
  }

  findAll(): Account[] {
    return Array.from(this.accounts.values());
  }
}
