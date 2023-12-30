import axios from 'axios'
import { BaseUrl } from '../Constants/BaseUrl'
import { useSelector } from "react-redux";

export const axiosInstance = () => {
    const token = useSelector((state) => state.user.token);
  
    const userInstance = axios.create({
      baseURL: BaseUrl,
    });
  
    userInstance.interceptors.request.use(
      (config)=>{
          if(token){
              config.headers["Authorization"] = `Bearer ${token}`;
          }
          return config
      },
      (error)=>{
          return Promise.reject(error);
      }
    )
  
    return userInstance
  };