import {Transaction} from '../models/Transaction.js';
import {Observer} from '../observers/Observer.js';
import {TransactionRepository} from './TransactionRepository.js';
import {BalanceCalculator} from './BalanceCalculator.js';

export class TransactionManager {
    #balance = 0
    #observers: Observer[] = []

    constructor(
        private repository: TransactionRepository,
        private calculator: BalanceCalculator,
    ) {
    }

    addObserver(observer: Observer) {
        this.#observers.push(observer)
    }

    private async notifyObservers(transaction: Transaction) {
        await Promise.all(
            this.#observers.map(obs =>
                obs.notify(transaction)
                    .catch(err => console.error('Observer failed:', err))
            )
        );
    }

    async addTransaction(amount: number, type: 'income' | 'expense', description: string): Promise<void> {
        const transaction = new Transaction(amount, type, description);
        this.repository.add(transaction);
        this.#balance = this.calculator.calculate(this.repository.getAll());

        await this.notifyObservers(transaction);
    }

    get balance(): number {
        return this.#balance
    }

    getTransactions(): Transaction[] {
        return this.repository.getAll();
    }
}