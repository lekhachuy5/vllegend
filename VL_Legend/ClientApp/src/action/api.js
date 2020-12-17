import axios from "axios";


export default {
    cus(url) {
        return {
            fetchAll: () => axios.get(url)
            , fetchById: id => axios.get(url + id),
            create: newReCord => axios.post(url, newReCord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}