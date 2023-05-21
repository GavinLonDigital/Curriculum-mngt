import axiosAuth from '../api/axiosConfig';
import useAuth from './useAuth';
import {useEffect} from 'react';

const useAxiosPrivate = () =>{
    const {auth} = useAuth();

    useEffect(()=>{

        const b64Encode = btoa(`${auth?.user}:${auth?.password}`);
       
        const requestIntercept = axiosAuth.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Basic ${b64Encode}`;
                }
                return config;
            },(error) => {
                Promise.reject(error);
            }

        )
        return () => {

            axiosAuth.interceptors.request.eject(requestIntercept);

        }

    },[auth])

    return axiosAuth;
}

export default useAxiosPrivate;