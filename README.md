# 💸 Financial Transactions Monolithic App (Design Patterns Showcase)

This is a **simple monolithic application** simulating a financial transaction system, built for **academic research** on software architecture evolution. It serves as a foundation for comparing **traditional design patterns (GoF)** with **modern microservice architectural patterns**.

---

## 📚 Purpose

The project applies **classic OOP design patterns** to a monolith architecture in a modular way, preparing the code for future **migration to microservices**. Each module mimics the role of a corresponding microservices concept.

---

## 🏗️ Architecture & Design Patterns

| Pattern (GoF)                | Module                             | Description                                                                 | Corresponding Microservice Pattern   |
|-----------------------------|------------------------------------|-----------------------------------------------------------------------------|-------------------------------------|
| **Composition**             | Modular folder structure           | Logical separation of domain/infra/use-cases for future splitting           | Modular services                    |
| **Facade**                  | `TransactionFacade`                | Simplifies interaction with transaction logic                               | API Gateway                         |
| **Proxy**                   | `TransactionServiceProxy`          | Adds Circuit Breaker behavior by tracking failures                          | Circuit Breaker                     |
| **Memento**                 | `SnapshotManager`                  | Stores snapshots of account state after each transaction                    | Event Sourcing                      |
| **Command**                 | `CreateTransactionCommand`         | Encapsulates actions as objects                                             | CQRS / Command Bus                  |
| **Chain of Responsibility**| `CreateTransactionHandler`         | Dynamically routes and handles commands                                     | Saga Orchestration                  |
| **Query**                   | `GetAccountBalanceQuery`, `GetAccountTransactionsQuery` | Separates read operations                            | CQRS                                |

---

## 📁 Folder Structure

```
src/
├── domain/
│   ├── account/
│   └── transaction/
├── facade/
├── proxy/
├── memento/
├── commands/
├── queries/
└── index.ts
```

---

## 🔄 Flow Description

1. **Account Creation**:
   - An `Account` is instantiated and stored using `AccountRepository`.

2. **Command Execution**:
   - A `CreateTransactionCommand` is created and handled through `CreateTransactionHandler`.

3. **Transaction Logic**:
   - `TransactionFacade` handles balance changes and persists the transaction.
   - A snapshot of the `Account` state is saved via `SnapshotManager`.

4. **Circuit Breaker (Proxy)**:
   - `TransactionServiceProxy` wraps the `TransactionFacade`, blocking calls after 3 failures for 5 seconds.

5. **Query Side (CQRS)**:
   - Read operations use `GetAccountBalanceQuery` and `GetAccountTransactionsQuery`.

---

## ▶️ Example Execution (via `index.ts`)

```bash
npm install
ts-node src/index.ts
```

Output:

```ts
Final balance (query): 70
Transaction history: [ ... ]
Snapshots: [ ... ]
```

---

## 🧪 Circuit Breaker Example

If 3 consecutive failures occur (e.g., trying to debit more than the account balance), the proxy opens the circuit:

```
Error: Circuit breaker is open. Please try again later.
```

After 5 seconds, the circuit closes and normal operation resumes.

---

## 🔮 Next Step

This monolithic architecture will be **refactored into a microservices version**, reusing domain logic and evolving each pattern into its modern counterpart (e.g., replace `Proxy` with a real circuit breaker in a service mesh).

---

## 👨‍🎓 Author

Built by **Cleyson** for academic research and final thesis (TCC).

---
