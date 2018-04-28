import Model from './Model';

export default class extends Model {
    static collection = 'tasks';

    get completed() {
        return !!this.attributes.completed_at;
    }
}
