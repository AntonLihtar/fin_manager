import {Transaction} from '../models/Transaction.js';
import {TransactionRepository} from './TransactionRepository.js';
import {BalanceCalculator} from './BalanceCalculator.js';
import {Logger} from './Logger.js';

export class TransactionManager {
    #balance = 0

    constructor(
        private repository: TransactionRepository,
        private calculator: BalanceCalculator,
        private logger: Logger
    ) {
    }

    addTransaction(amount: number, type: 'income' | 'expense', description: string): void {
        const transaction = new Transaction(amount, type, description);

        this.repository.add(transaction);
        this.logger.log(`Добавлена операция: ${description} (${amount})`);

        this.#balance = this.calculator.calculate(this.repository.getAll());
    }

    get balance(): number {
        return this.#balance
    }
}