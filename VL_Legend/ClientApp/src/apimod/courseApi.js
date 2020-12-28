import axiosClient from './axiosClient'

const CourseApi = {
    getAll : (params,id) => {
        const url = `/Course/GetAllById/${id}`;
        return axiosClient.get(url,{params});
    },
    get : (id) =>{
        const url = `/Course/${id}`;
        return axiosClient.get(url)
    },
    update : (id,input) => {
        const url = `/Course/edit/${id}`;
        return  axiosClient.put(url,input)
    },
    create : (input) =>{
        const url = '/Course/create';
        return axiosClient.post(url,input);
    }

}

export default CourseApi