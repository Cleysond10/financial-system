import { AccountSnapshot } from "../domain/account/Account";

export class SnapshotManager {
  private history: Map<string, AccountSnapshot[]> = new Map();

  saveSnapshot(snapshot: AccountSnapshot): void {
    if (!this.history.has(snapshot.id)) {
      this.history.set(snapshot.id, []);
    }
    this.history.get(snapshot.id)?.push(snapshot);
  }

  getSnapshots(accountId: string): AccountSnapshot[] {
    return this.history.get(accountId) || [];
  }
}
