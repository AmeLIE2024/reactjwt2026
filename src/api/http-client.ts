import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use(
  (config) => {
    console.log("Request config:", config)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    console.log("Status :", response.status);
    console.log("Data:", response.data);
    console.log("Headers:", response.headers);

    return response;
  },
  (error) => {

    if (error.response.status === 401) {
      console.error("Unauthorized access - maybe the token is invalid or expired:", error);
      if(window.location.href == "http://localhost:4200/"){
        alert("les identifiants renseignés sont invalides");
      }else{
        alert("Votre session a expiré. Veuillez vous reconnecter.");
      }
      return Promise.reject(error)
    }
    if (error.response.status === 403) {
      console.error("Forbidden access:", error);
    alert("Action interdite. Vous n'avez pas la permission d'effectuer cette action.");
      return Promise.reject(error)
    }
    if (error.response.status === 404) {
      console.error("Resource not found:", error);
      alert("La ressource demandée n'existe pas.");
      return Promise.reject(error)
    }
    if (error.response.status === 500) {
      console.error("Internal server error:", error);
      alert("Une erreur interne s'est produite. Veuillez réessayer ultérieurement.");
      return Promise.reject(error)
    }
  });
