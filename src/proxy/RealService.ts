import { Service } from "./Service";

export class RealService implements Service {
  execute(): void {
    console.log("Real service executed");
  }
}
