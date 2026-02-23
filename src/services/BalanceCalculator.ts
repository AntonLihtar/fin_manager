import { Transaction } from '../models/Transaction.js';

export class BalanceCalculator {
    calculate(transactions: Transaction[]): number {
        return transactions.reduce((total, t) => {
            return t.type === 'income'
                ? total + t.amount
                : total - t.amount;
        }, 0);
    }
}