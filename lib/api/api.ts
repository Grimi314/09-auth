import axios, {AxiosError} from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL;
export type ApiError = AxiosError<{ error: string }>

export const api = axios.create({
   withCredentials: true,
  baseURL: `${baseURL}/api` ,
 
});

