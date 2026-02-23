var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TransactionManager_balance;
import { Transaction } from '../models/Transaction.js';
export class TransactionManager {
    constructor(repository, calculator, logger) {
        this.repository = repository;
        this.calculator = calculator;
        this.logger = logger;
        _TransactionManager_balance.set(this, 0);
    }
    addTransaction(amount, type, description) {
        const transaction = new Transaction(amount, type, description);
        this.repository.add(transaction);
        this.logger.log(`Добавлена операция: ${description} (${amount})`);
        __classPrivateFieldSet(this, _TransactionManager_balance, this.calculator.calculate(this.repository.getAll()), "f");
    }
    get balance() {
        return __classPrivateFieldGet(this, _TransactionManager_balance, "f");
    }
}
_TransactionManager_balance = new WeakMap();
