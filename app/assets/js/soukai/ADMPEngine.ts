import Axios from 'axios';
import SoukaiEngine, { Attributes, Document, PrimaryKey } from './SoukaiEngine';

export default class implements SoukaiEngine {

    private url: string;
    private accessToken: string;

    constructor(url: string, accessToken: string) {
        this.url = url;
        this.accessToken = accessToken;
    }

    public create(collection: string, attributes: Attributes): Promise<PrimaryKey> {
        return Axios.post(
            this.url + '/items',
            {
                access_token: this.accessToken,
                collection,
                data: JSON.stringify(attributes),
            },
        ).then(response => response.data.id);
    }

    public readOne(collection: string, id: PrimaryKey): Promise<Document> {
        return Promise.reject(null);
    }

    public readAll(collection: string): Promise<Document[]> {
        return Axios.get(
            this.url + '/items',
            {
                params: {
                    access_token: this.accessToken,
                    collection,
                },
            },
        ).then(response => response.data);
    }

    public update(collection: string, id: PrimaryKey, attributes: Attributes): Promise<void> {
        return Axios.patch(
            this.url + '/items/' + id,
            {
                access_token: this.accessToken,
                collection,
                data: JSON.stringify(attributes),
            },
        ).then(response => response.data);
    }

    public delete(collection: string, id: PrimaryKey): Promise<void> {
        return Promise.reject(null);
    }

}
