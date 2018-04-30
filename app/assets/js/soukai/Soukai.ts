import Model from './Model';
import SoukaiEngine from './SoukaiEngine';

class Soukai {

    private _engine: SoukaiEngine;

    public useEngine(engine: SoukaiEngine): void {
        this._engine = engine;
    }

    public loadModels(models: { [name: string]: typeof Model}): void {
        for (const name in models) {
            if (models.hasOwnProperty(name)) {
                this.loadModel(name, models[name]);
            }
        }
    }

    public loadModel(name: string, model: typeof Model): void {
        model.boot(name);
    }

    public get engine(): SoukaiEngine {
        return this._engine;
    }

}

export default new Soukai();
