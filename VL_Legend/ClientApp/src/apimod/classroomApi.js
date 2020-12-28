import axiosClient from './axiosClient'

const ClassApi = {
    getAll : (params) => {
        const url = '/classroom';
        return axiosClient.get(url,{params});
    },
    get : (id) =>{
        const url = `/classroom/${id}`;
        return axiosClient.get(url)
    },
    update : (id,input) => {
        const url = `/classroom/edit/${id}`;
        return  axiosClient.put(url,input)
    },
    create : (input) =>{
        const url = '/classroom/create';
        return axiosClient.post(url,input);
    }

}

export default ClassApi