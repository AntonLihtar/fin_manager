export type TransactionType = 'income' | 'expense';

export class Transaction {
    public readonly amount: number;
    public readonly type: TransactionType;
    public readonly description: string;

    constructor(amount: number, type: TransactionType, description: string) {
        this.amount = amount;
        this.type = type; // 'income' | 'expense'
        this.description = description;
    }
}