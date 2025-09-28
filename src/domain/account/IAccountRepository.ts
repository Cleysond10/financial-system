import { Account } from "./Account";

export interface IAccountRepository {
  save(account: Account): void;
  findById(id: string): Account | undefined;
  findAll(): Account[];
}
