module.exports = class GenericRepo {
    constructor(options, store) {
        this.schema = options.schema;
        this.store = Reflect.construct(store.get(), []);
        this.id = 0;
    }
    get(id) {
        return this.store.get(id.toString());
    }
    list(page, limit) {
        let listId = this.store.keys(); //array
        let indexStart = 0;
        if(page > 0) {
            indexStart = page*limit;
        }
        if(listId.length < limit) {
            limit = listId.length;
        }
        if(limit === 0) {
            limit = listId.length;
        }
        let tempReturn = [];
        for(let index = indexStart; limit !== 0;indexStart++) {
            let data = this.store.get(listId[indexStart].toString());
            limit--;
            tempReturn.push(data);
        }
        return tempReturn;
    }
    create(data) {
        this.id++;
        data.id = this.id;
        this.store.set(this.id.toString(), data);
        return data;
    }
    update(id, data) {
        let oldData = this.store.get(id.toString());
        for(let property in data) {
            if(oldData.hasOwnProperty(property)) {
                oldData[property] = data[property];
            }
        }
        this.store.set(id.toString(), oldData);
        return oldData;
    }
    remove(id) {
        let deletedData = this.store.get(id.toString());
        this.store.delete(id.toString());
        return deletedData;
    }
}