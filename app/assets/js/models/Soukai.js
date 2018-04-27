export default class {
    static __engine = null;

    static engine(engine) {
        this.__engine = engine;
    }

    static create(attributes = {}) {
        const model = new this(attributes);
        return model.save();
    }

    static find(id) {
        return this.__engine.read(this.collection, id)
            .then(attributes => {
                if (attributes) {
                    return new this(attributes, true);
                } else {
                    return null;
                }
            });
    }

    static all() {
        return this.__engine.read(this.collection)
            .then(models => models.map(attributes => new this(attributes, true)));
    }

    constructor(attributes, exists = false) {
        this.attributes = {...attributes};
        this.dirty = {...attributes};
        this.exists = exists;

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

    update(attributes) {
        this.attributes = { ...this.attributes, ...attributes };
        this.dirty = { ...this.dirty, ...attributes };

        return this.save();
    }

    delete() {
        return this.constructor.__engine.delete(
            this.constructor.collection,
            this.id
        )
            .then(() => {
                delete this.attributes.id;
                this.exists = false;

                return this;
            });
    }

    save() {
        if (this.exists) {
            return this.constructor.__engine.update(
                this.constructor.collection,
                this.attributes.id,
                this.dirty
            )
                .then(() => {
                    this.dirty = {};

                    return this;
                });
        } else {
            return this.constructor.__engine.create(
                this.constructor.collection,
                this.attributes
            )
                .then(id => {
                    this.attributes.id = id;
                    this.dirty = {};
                    this.exists = true;

                    return this;
                });
        }
    }
}
