module.exports = class UserRepo {
    constructor(store) {
        this.store = Reflect.construct(store.get(), []);
        this.userId = 0;
    }
    get(userId) {
        return this.store.get(userId.toString());
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
        this.userId++;
        data.id = this.userId;
        this.store.set(this.userId.toString(), data);
        return data;
    }
    update(userId, data) {
        let oldData = this.store.get(userId.toString());
        for(let property in data) {
            if(oldData.hasOwnProperty(property)) {
                oldData[property] = data[property];
            }
        }
        this.store.set(userId.toString(), oldData);
        return oldData;
    }
    remove(userId) {
        let deletedData = this.store.get(userId.toString());
        this.store.delete(userId.toString());
        return deletedData;
    }
}