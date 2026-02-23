import {Transaction} from "../models/Transaction.js";

export class TransactionManager {
    #balance = 0
    constructor(repository, calculator, logger) {
        this.repository = repository;
        this.calculator = calculator;
        this.logger = logger;
    }

    addTransaction(amount, type, description) {
        const transaction = new Transaction(amount, type, description);

        this.repository.add(transaction);
        this.logger.log(`Добавлена операция: ${description} (${amount})`);

        this.#balance = this.calculator.calculate(this.repository.getAll());
    }
    get balance(){
        return this.#balance
    }
}