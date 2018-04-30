import { PrimaryKey } from '../SoukaiEngine';

export default class extends Error {

    constructor(id: PrimaryKey) {
        super(`Model with id ${id} not found`);
    }

}
