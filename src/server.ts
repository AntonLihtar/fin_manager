import express from 'express';
import {TransactionRepository} from './services/TransactionRepository.js';
import {BalanceCalculator} from './services/BalanceCalculator.js';
import {TransactionManager} from './services/TransactionManager.js';
import {ConsoleObserver} from './observers/ConsoleObserver.js';

const app = express();
app.use(express.json());
app.use(express.static('public'));

// создаём сервисы
const repo = new TransactionRepository();
const calculator = new BalanceCalculator();
const consoleLogger = new ConsoleObserver();
const manager = new TransactionManager(repo, calculator);
manager.addObserver(consoleLogger)

// REST endpoint для добавления транзакции
app.post('/transaction', async (req, res) => {
    const {amount, type, description} = req.body;

    await manager.addTransaction(amount, type, description);

    res.json({
        message: `Транзакция добавлена: ${description}`,
    });
});

// REST endpoint для получения транзакций
app.get('/transactions', (req, res) => {
    res.json({transactions: manager.getTransactions()});
});

// REST endpoint для получения баланса
app.get('/balance', (req, res) => {
    res.json({balance: manager.balance});
});

app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:80');
});