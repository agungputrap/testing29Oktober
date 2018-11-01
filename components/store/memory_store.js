var memstore = require('memstore').Store;

module.exports = class Memstore {
    constructor() {
        this.store = memstore;
    }
    get() {
        return this.store;
    }
}