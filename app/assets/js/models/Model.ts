import Soukai from './Soukai';
import SoukaiEngine, { Attributes, Document, PrimaryKey } from './SoukaiEngine';

export default abstract class Model {

    public static create<T extends Model>(attributes: Attributes = {}): Promise<T> {
        const model = new (<any> this)(attributes);
        return model.save();
    }

    public static find<T extends Model>(id: PrimaryKey): Promise<T | null> {
        return Soukai.engine.readOne(this.instance.collection, id)
            .then(attributes => new (<any> this)(attributes, true))
            .catch(() => null);
    }

    public static all<T extends Model>(): Promise<T[]> {
        return Soukai.engine.readAll(this.instance.collection)
            .then(models => models.map(attributes => new (<any> this)(attributes, true)));
    }

    private static get instance(): Model {
        return new (<any> this)();
    }

    public get collection(): string {
        return (<any> this).constructor.collection;
    }

    protected attributes: Attributes | Document;
    protected dirty: Attributes;
    protected exists: boolean;

    constructor(attributes: Attributes | Document, exists = false) {
        this.attributes = {...attributes};
        this.exists = exists;
        this.dirty = exists ? {} : {...attributes};

        return new Proxy(this, {
            get(target, key) {
                if (key in target) {
                    return target[key];
                } else if (key in target.attributes) {
                    return target.attributes[key];
                } else {
                    return undefined;
                }
            },
        });
    }

    public update<T extends Model>(attributes: Attributes): Promise<T> {
        this.attributes = { ...this.attributes, ...attributes };
        this.dirty = { ...this.dirty, ...attributes };

        return this.save();
    }

    public delete<T extends Model>(): Promise<T> {
        return Soukai.engine.delete(
            this.collection,
            this.attributes.id,
        )
            .then(() => {
                delete this.attributes.id;
                this.exists = false;

                return <any> this;
            });
    }

    public save<T extends Model>(): Promise<T> {
        if (this.exists) {
            return Soukai.engine.update(
                this.collection,
                this.attributes.id,
                this.dirty,
            )
                .then(() => {
                    this.dirty = {};

                    return <any> this;
                });
        } else {
            return Soukai.engine.create(
                this.collection,
                this.attributes,
            )
                .then(id => {
                    this.attributes.id = id;
                    this.dirty = {};
                    this.exists = true;

                    return <any> this;
                });
        }
    }

}
