import {httpClient} from "../api/http-client";


export async function logIn(username: string, password: string): Promise<string> {
  return await httpClient.post('/auth/login', {username, password})
    .then((response) => {
      console.log("Login successful:", response.data);
      localStorage.setItem('token', response.data.token);

      return response.data.token


    })
    .catch((error) => {
      console.error("Login failed:", error);
      throw error;

    })

}

export function logOut() {
  localStorage.removeItem('token');
  return null;
}
