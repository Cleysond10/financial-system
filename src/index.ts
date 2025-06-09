import { Account } from "./domain/account/Account";
import { AccountRepository } from "./domain/account/AccountRepository";
import { TransactionRepository } from "./domain/transaction/TransactionRepository";
import { SnapshotManager } from "./memento/SnapshotManager";
import { TransactionFacade } from "./facade/TransactionFacade";
import { GetAccountBalanceQuery } from "./queries/GetAccountBalanceQuery";
import { GetAccountTransactionsQuery } from "./queries/GetAccountTransactionsQuery";
import { CreateTransactionCommand } from "./commands/CreateTransactionCommand";
import { CreateTransactionHandler } from "./commands/CreateTransactionHandler";

const accountRepo = new AccountRepository();
const transactionRepo = new TransactionRepository();
const snapshotManager = new SnapshotManager();

const facade = new TransactionFacade(accountRepo, transactionRepo, snapshotManager);

// Handler da cadeia de comandos
const handler = new CreateTransactionHandler();

// Criando conta de teste
const account = new Account("acc-1", "Cleyson", 100);
accountRepo.save(account);

// Comando de transação
const command = new CreateTransactionCommand(facade, "acc-1", 30, "debit");
handler.handle(command);

// Executando queries (CQRS)
const balanceQuery = new GetAccountBalanceQuery(accountRepo);
const transactionsQuery = new GetAccountTransactionsQuery(transactionRepo);

console.log("Saldo final (query):", balanceQuery.execute("acc-1"));
console.log("Histórico de transações (query):", transactionsQuery.execute("acc-1"));
console.log("Snapshots:", snapshotManager.getSnapshots("acc-1"));
