import axiosClient from './axiosClient'

const SysConfigApi = {
    get : () =>{
        const url = `/system_config/1`;
        return axiosClient.get(url)
    },
    update : (input) => {
        const url = `/system_config/edit/1`;
        return  axiosClient.put(url,input)
    }
}

export default SysConfigApi