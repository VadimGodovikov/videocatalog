import { $authHost, $host } from "./index";
import {jwtDecode as jwt_decode} from "jwt-decode";

export const registration = async (Login, Password, Email, Birthday) => {
    const {data} = await $host.post('/api/user/registration', {
        Login,
        Password,
        Email,
        Birthday
      });
      localStorage.setItem('token', data.token)  
    return jwt_decode(data.token)
  };
export const login = async(Login, Password) => {
    const {data} = await $host.post('api/user/login', {Login, Password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token);
}
export const check = async() => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token);
}