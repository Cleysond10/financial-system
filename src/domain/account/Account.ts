export class Account {
  constructor(
    public readonly id: string,
    public readonly name: string,
    private _balance: number
  ) {}

  get balance(): number {
    return this._balance;
  }

  credit(amount: number): void {
    this._balance += amount;
  }

  debit(amount: number): void {
    if (amount > this._balance) {
      throw new Error("Insufficient funds");
    }
    this._balance -= amount;
  }

  createSnapshot(): AccountSnapshot {
    return new AccountSnapshot(this.id, this.name, this._balance);
  }

  restore(snapshot: AccountSnapshot): void {
    if (this.id !== snapshot.id) throw new Error("Snapshot mismatch");
    this._balance = snapshot.balance;
  }
}

export class AccountSnapshot {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly balance: number
  ) {}
}
