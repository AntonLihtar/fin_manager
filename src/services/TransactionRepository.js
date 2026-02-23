export class TransactionRepository {
    constructor() {
        this.transactions = [];
    }
    add(transaction) {
        this.transactions.push(transaction);
    }
    getAll() {
        return [...this.transactions];
    }
}
