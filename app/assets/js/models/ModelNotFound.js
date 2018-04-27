export default class extends Error {
    constructor(id) {
        super(`Model with id ${id} not found`);
    }
}
