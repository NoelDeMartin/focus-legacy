import { Model, FieldType } from 'soukai';

export default class extends Model {
    static timestamps = true;

    static fields = {
        name: FieldType.String,
        completed_at: FieldType.Date,
    };

    get completed() {
        return !!this.getAttribute('completed_at');
    }
}
