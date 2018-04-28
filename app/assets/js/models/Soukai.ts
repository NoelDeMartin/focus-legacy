import SoukaiEngine from './SoukaiEngine';

class Soukai {

    private _engine: SoukaiEngine;

    public use(engine: SoukaiEngine): void {
        this._engine = engine;
    }

    public get engine(): SoukaiEngine {
        return this._engine;
    }

}

export default new Soukai();
