module.exports = class ConversationRepo {
    constructor(store) {
        this.store = Reflect.construct(store.get(), []);
        this.convId = 0;
    }
    get(convId) {
        return this.store.get(convId.toString());
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
        this.convId++;
        data.id = this.convId;
        this.store.set(this.convId.toString(), data);
        return data;
    }
    update(convId, data) {
        let oldData = this.store.get(convId.toString());
        for(let property in data) {
            if(oldData.hasOwnProperty(property)) {
                oldData[property] = data[property];
            }
        }
        this.store.set(convId.toString(), oldData);
        return oldData;
    }
    remove(convId) {
        let deletedData = this.store.get(convId.toString());
        this.store.delete(convId.toString());
        return deletedData;
    }
}