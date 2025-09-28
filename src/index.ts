import { Account } from "./domain/account/Account";
import { AccountRepository } from "./domain/account/AccountRepository";
import { TransactionRepository } from "./domain/transaction/TransactionRepository";
import { SnapshotManager } from "./memento/SnapshotManager";
import { TransactionFacade } from "./facade/TransactionFacade";
import { TransactionServiceProxy } from "./proxy/TransactionServiceProxy";
import { GetAccountBalanceQuery } from "./queries/GetAccountBalanceQuery";
import { GetAccountTransactionsQuery } from "./queries/GetAccountTransactionsQuery";
import { CreateTransactionCommand } from "./commands/CreateTransactionCommand";
import { CreateTransactionHandler } from "./chain/CreateTransactionHandler";

// Configuração dos repositórios e serviços
const accountRepo = new AccountRepository();
const transactionRepo = new TransactionRepository();
const snapshotManager = new SnapshotManager();

// Facade e Proxy para simplificar a interface de transações e adicionar controle de acesso (Proxy Pattern)
const facade = new TransactionFacade(accountRepo, transactionRepo, snapshotManager);
const proxy = new TransactionServiceProxy(facade);
const handler = new CreateTransactionHandler();

// Criando conta de teste e salvando no repositório (injeção manual)
const account = new Account("acc-1", "Cleyson", 100);
accountRepo.save(account);

// Executando comando de transação através do proxy e handler da cadeia de comandos (Chain of Responsibility)
const command = new CreateTransactionCommand(proxy, "acc-1", 50, "credit");
handler.handle(command);

// Executando queries de leitura (CQRS)
const balanceQuery = new GetAccountBalanceQuery(accountRepo);
const transactionsQuery = new GetAccountTransactionsQuery(transactionRepo);

console.log("Saldo final (query):", balanceQuery.execute("acc-1"));
console.log("Histórico de transações (query):", transactionsQuery.execute("acc-1"));
console.log("Snapshots:", snapshotManager.getSnapshots("acc-1"));
