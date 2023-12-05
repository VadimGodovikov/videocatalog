import { $authHost, $host } from "./index";

export const registration = async (Login, Password, Email, Birthday) => {
    try {
      const response = await $host.post('/api/user/registration', {
        Login,
        Password,
        Email,
        Birthday
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
export const login = async(Login, Password) => {
    const response = await $host.post('api/user/login', {Login, Password})
    return response
}
export const check = async() => {
    const response = await $host.post('api/user/auth')
    return response
}