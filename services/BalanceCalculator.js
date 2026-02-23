export class BalanceCalculator {
    constructor() {
    }
    calculate(transactions) {
        return transactions.reduce((total, t) => {
            return t.type === 'income'
                ? total + t.amount
                : total - t.amount;
        }, 0);
    }
}