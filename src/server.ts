import express from 'express';
import { TransactionRepository } from './services/TransactionRepository.js';
import { BalanceCalculator } from './services/BalanceCalculator.js';
import { Logger } from './services/Logger.js';
import { TransactionManager } from './services/TransactionManager.js';

const app = express();
app.use(express.json());

// создаём сервисы
const repo = new TransactionRepository();
const calculator = new BalanceCalculator();
const logger = new Logger();
const manager = new TransactionManager(repo, calculator, logger);

// REST endpoint для добавления транзакции
app.post('/transactions', (req, res) => {
    const { amount, type, description } = req.body;

    manager.addTransaction(amount, type, description);

    res.json({
        message: `Транзакция добавлена: ${description}`,
        balance: manager.balance
    });
});

// REST endpoint для получения баланса
app.get('/balance', (req, res) => {
    res.json({ balance: manager.balance });
});

app.listen(80, () => {
    console.log('Сервер запущен на http://localhost:80');
});