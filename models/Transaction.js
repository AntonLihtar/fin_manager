export class Transaction {
    constructor(amount, type, description) {
        this.amount = amount;
        this.type = type; // 'income' | 'expense'
        this.description = description;
    }
}