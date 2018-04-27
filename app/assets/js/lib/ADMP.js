import Axios from 'axios';

class ADMP {
    init(accessToken) {
        this.accessToken = accessToken;
    }

    items(collection) {
        return Axios.get(
            'http://kinko.test/admp/items',
            {
                params: {
                    collection,
                    access_token: this.accessToken,
                },
            }
        ).then(response => response.data);
    }

    createItem(collection, data) {
        return Axios.post(
            'http://kinko.test/admp/items',
            {
                collection,
                access_token: this.accessToken,
                data: JSON.stringify(data),
            }
        ).then(response => response.data);
    }

    updateItem(collection, id, data) {
        return Axios.patch(
            'http://kinko.test/admp/items/' + id,
            {
                collection,
                access_token: this.accessToken,
                data: JSON.stringify(data),
            }
        ).then(response => response.data);
    }
}

export default new ADMP();
