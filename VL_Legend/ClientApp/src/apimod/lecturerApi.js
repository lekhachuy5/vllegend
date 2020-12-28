import axiosClient from './axiosClient'

const LecturerApi = {
    getAll: (params, id) => {
        const url = `/Lecturer/GetAllById/${id}`;
        return axiosClient.get(url, { params });
    },
    get: (id) => {
        const url = `/Lecturer/${id}`;
        return axiosClient.get(url)
    },
    update: (id, input) => {
        const url = `/Lecturer/edit/${id}`;
        return axiosClient.put(url, input)
    },
    create: (input) => {
        const url = '/Lecturer/create';
        return axiosClient.post(url, input);
    }

}

export default LecturerApi