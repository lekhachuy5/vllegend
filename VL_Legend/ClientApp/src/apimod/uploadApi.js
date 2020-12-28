import axiosClient from './axiosClient'

const UploadAPI = {
    create : (folder,file) => {
      const input = {folder,file}
      folder = folder ? folder : 'upload'
      console.log(input);
      
        const config = {
            headers: {  
              "content-type": "multipart/form-data",
            },
          };
        const url = `/upload/postfile/${folder}`;
        return  axiosClient.post(url,file,config)
    }
}

export default UploadAPI