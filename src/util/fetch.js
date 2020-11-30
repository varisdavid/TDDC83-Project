import axios from 'axios';

const publicFetch = axios.create({
  baseURL: 'https://tddc88-company-3-2020.kubernetes-public.it.liu.se/api',
});

export { publicFetch };
