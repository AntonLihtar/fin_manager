import {Transaction} from "../models/Transaction.js";
import {Observer} from "./Observer.js";

export class ConsoleObserver extends Observer{
    override async notify(transaction: Transaction) {
        console.log(`Добавлена операция: [${transaction.type}] ${transaction.amount} ${transaction.description}`)
    }
}