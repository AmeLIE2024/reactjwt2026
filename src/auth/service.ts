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

export function getRoles(){
  const token = localStorage.getItem('token')
  if (token != null) {
    const tokenDecoded = JSON.parse(atob(token.split('.')[1]))
    console.log("test affichage token decodé: ", tokenDecoded)
    return tokenDecoded.scope.split(" ");
  }
  return []
}

//indique si l'utilisateur possède le rôle spécifié
export function hasRole(role:string){
  const roles = getRoles()
  return roles.includes(role)
}
