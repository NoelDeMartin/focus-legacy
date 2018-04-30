export type PrimaryKey = string;

export interface Attributes {
    [key: string]: any | Attributes;
}

export interface Document extends Attributes {
    id: PrimaryKey;
}

export default interface SoukaiEngine {

    create(collection: string, attributes: Attributes): Promise<PrimaryKey>;

    readOne(collection: string, id: PrimaryKey): Promise<Document>;

    readAll(collection: string): Promise<Document[]>;

    update(collection: string, id: PrimaryKey, attributes: Attributes): Promise<void>;

    delete(collection: string, id: PrimaryKey): Promise<void>;

}
