import Model, { Types } from '../soukai/Model';

export default class extends Model {
    static timestamps = true;

    static fields = {
        name: Types.String,
        completed_at: Types.Date,
    };

    get completed() {
        return !!this.attributes.completed_at;
    }
}
