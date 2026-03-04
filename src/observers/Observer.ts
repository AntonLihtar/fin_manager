import {Transaction} from "../models/Transaction.js";

// Абстрактный класс Observer
export abstract class Observer {
    // Абстрактный метод notify, который должны реализовать все потомки
    abstract notify(transaction: Transaction): Promise<void>;
}
