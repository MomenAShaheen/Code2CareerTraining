"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(initialItems = []) {
        this.items = initialItems;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return [...this.items];
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.items.find(item => item.id === id);
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = Object.assign(Object.assign({}, item), { id: this.generateId() });
            this.items.push(newItem);
            return newItem;
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.items.findIndex(i => i.id === id);
            if (index === -1)
                return undefined;
            const updatedItem = Object.assign(Object.assign(Object.assign({}, this.items[index]), item), { id });
            this.items[index] = updatedItem;
            return updatedItem;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const initialLength = this.items.length;
            this.items = this.items.filter(item => item.id !== id);
            return this.items.length !== initialLength;
        });
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.items.filter(item => {
                return Object.keys(filter).every(key => {
                    return item[key] === filter[key];
                });
            });
        });
    }
    generateId() {
        return Math.random().toString(36).substring(2, 9);
    }
}
exports.BaseRepository = BaseRepository;
