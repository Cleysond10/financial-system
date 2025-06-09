import { Account } from "./Account";

export class AccountRepository {
  private accounts: Map<string, Account> = new Map();

  findById(id: string): Account | undefined {
    return this.accounts.get(id);
  }

  save(account: Account): void {
    this.accounts.set(account.id, account);
  }

  findAll(): Account[] {
    return Array.from(this.accounts.values());
  }
}
