import axios from 'axios';
import { toast } from 'react-toastify'

let baseURL = 'http://localhost:8000/api/';

const httpClient = axios.create({ baseURL });

// Add a request interceptor
httpClient.interceptors.request.use(
    function(successReq) { 
      return successReq;
    }, 
    function(error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
httpClient.interceptors.response.use(
    function(successRes) {
      return successRes;
    }, 
    function(error) {
      if (error.response.status === 401) {
        if (error.response.data.detail) {
          toast.error(error.response.data.detail)
        }
       }
      return Promise.reject(error);
    }
  );

export default httpClient;
