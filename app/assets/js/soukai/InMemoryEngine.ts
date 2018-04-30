import ModelNotFound from './errors/ModelNotFound';
import SoukaiEngine, { Attributes, Document, PrimaryKey } from './SoukaiEngine';

interface Collection {
    incrementalCount: number;
    documents: {
        [id: string]: Document,
    };
}

export default class implements SoukaiEngine {

    private db: { [collection: string]: Collection } = {};

    public create(collectionName: string, attributes: Attributes): Promise<PrimaryKey> {
        const collection = this.collection(collectionName);
        const id = (collection.incrementalCount++).toString();
        collection.documents[id] = { ...{ id }, ...attributes.id };
        return Promise.resolve(id);
    }

    public readOne(collectionName: string, id: PrimaryKey): Promise<Document> {
        const collection = this.collection(collectionName);
        if (id in collection.documents) {
            return Promise.resolve(collection.documents[id]);
        } else {
            return Promise.reject(new ModelNotFound(id));
        }
    }

    public readAll(collectionName: string): Promise<Document[]> {
        const collection = this.collection(collectionName);
        return Promise.resolve(Object.values(collection.documents));
    }

    public update(collectionName: string, id: PrimaryKey, attributes: Attributes): Promise<void> {
        const collection = this.collection(collectionName);
        if (id in collection.documents) {
            const document = collection.documents[id];
            collection.documents[id] = { ...document, ...attributes };
            return Promise.resolve();
        } else {
            return Promise.reject(new ModelNotFound(id));
        }
    }

    public delete(collectionName: string, id: PrimaryKey): Promise<void> {
        const collection = this.collection(collectionName);
        if (id in collection.documents) {
            delete collection.documents[id];
            return Promise.resolve();
        } else {
            return Promise.reject(new ModelNotFound(id));
        }
    }

    private collection(name: string): Collection {
        if (!(name in this.db)) {
            this.db[name] = {
                documents: {},
                incrementalCount: 0,
            };
        }

        return this.db[name];
    }

}
