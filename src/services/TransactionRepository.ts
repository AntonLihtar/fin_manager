import { Transaction } from '../models/Transaction.js';

export class TransactionRepository {
    private transactions: Transaction[] = [];

    add(transaction : Transaction) {
        this.transactions.push(transaction);
    }

    getAll(): Transaction[] {
        return [...this.transactions];
    }
}