import Axios from 'axios';

import Soukai, {
    Database,
    Engine,
    FieldsDefinition,
    FieldType,
    Model,
} from 'soukai';

export enum Cast {
    Date = 'date',
}

interface AttributeCasts {
    [field: string]: Cast | AttributeCasts;
}

export default class implements Engine {

    private url: string;
    private accessToken: string;

    constructor(url: string, accessToken: string) {
        this.url = url;
        this.accessToken = accessToken;
    }

    public create(model: typeof Model, attributes: Database.Attributes): Promise<Database.Key> {
        return Axios.post(
            this.url + '/documents',
            {
                access_token: this.accessToken,
                collection: model.collection,
                data: attributes,
                casts: getAttributeCasts(attributes, model.fields),
            },
        ).then(response => response.data.id);
    }

    public readOne(model: typeof Model, id: Database.Key): Promise<Database.Document> {
        return Promise.reject(null);
    }

    public readMany(model: typeof Model): Promise<Database.Document[]> {
        return Axios.get(
            this.url + '/documents',
            {
                params: {
                    access_token: this.accessToken,
                    collection: model.collection,
                },
            },
        ).then(response => response.data);
    }

    public update(
        model: typeof Model,
        id: Database.Key,
        dirtyAttributes: Database.Attributes,
        removedAttributes: string[],
    ): Promise<void> {
        return Axios.patch(
            this.url + '/documents/' + id,
            {
                access_token: this.accessToken,
                collection: model.collection,
                updated_data: dirtyAttributes,
                removed_data: removedAttributes,
                casts: getAttributeCasts(dirtyAttributes, model.fields),
            },
        ).then(response => response.data);
    }

    public delete(model: typeof Model, id: Database.Key): Promise<void> {
        return Promise.reject(null);
    }

}

function getAttributeCasts(attributes: Database.Attributes, fields: FieldsDefinition): AttributeCasts {
    const casts = {};
    for (const field in attributes) {
        if (attributes.hasOwnProperty(field) && field in fields) {
            switch (fields[field].type) {
                case FieldType.Date:
                    casts[field] = Cast.Date;
                    break;
                case FieldType.Object:
                    const attributeCasts = getAttributeCasts(
                        <Database.Attributes> attributes[field],
                        <FieldsDefinition> fields[field].fields,
                    );
                    if (Object.keys(attributeCasts).length > 0) {
                        casts[field] = attributeCasts;
                    }
                    break;
            }
        }
    }
    return casts;
}
