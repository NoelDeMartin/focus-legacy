import ModelNotFound from './ModelNotFound';

export default class {
    constructor() {
        this.count = 0;
        this.db = {};
    }

    create(collection, attributes) {
        console.log('CREATE', collection, attributes);
        const id = (this.count++).toString();
        this.db[id] = attributes;
        attributes.id = id;
        console.log('CREATED', id);
        return Promise.resolve(id);
    }

    read(collection, id) {
        console.log('READ', collection, id);
        if (id in this.db) {
            const attributes = this.db[id];
            console.log('FOUND', attributes);
            return Promise.resolve(attributes);
        } else if (!id) {
            console.log('READ ALL');
            return Promise.resolve(Object.values(this.db));
        } else {
            console.log('NOT FOUND');
            return Promise.reject(new ModelNotFound(id));
        }
    }

    update(collection, id, dirtyAttributes) {
        console.log('UPDATE', collection, id, dirtyAttributes);
        if (id in this.db) {
            const attributes = this.db[id];
            this.db[id] = { ...attributes, ...dirtyAttributes };
            console.log('UPDATED');
            return Promise.resolve();
        } else {
            console.log('NOT FOUND');
            return Promise.reject(new ModelNotFound(id));
        }
    }

    delete(collection, id) {
        console.log('DELETE', collection, id);
        if (id in this.db) {
            console.log('DELETED');
            delete this.db[id];
            return Promise.resolve();
        } else {
            console.log('NOT FOUND');
            return Promise.reject(new ModelNotFound(id));
        }
    }
}
