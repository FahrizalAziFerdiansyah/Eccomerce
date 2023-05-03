import axios from 'axios';
import {BASE_URL, getData} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {networkError} from '../redux/action/NetworkAction';

export default (dispatch = null) => {
  let headers = {'Content-Type': 'multipart/form-data'};
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers,
  });

  axiosInstance.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      dispatch(networkError(error.response.status));
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
