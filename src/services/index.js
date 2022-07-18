import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
const token = localStorage?.getItem('op-access-token');

const apiAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
    'content-type': 'multipart/form-data',
  },
});

export const addNewImage = async (formData) => {
  return await apiMulti.put(`/uploads`, formData);
};
