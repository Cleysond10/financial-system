import { AccountRepository } from "../domain/account/AccountRepository";

export class GetAccountBalanceQuery {
  constructor(private readonly repo: AccountRepository) {}

  execute(accountId: string): number | undefined {
    return this.repo.findById(accountId)?.balance;
  }
}
