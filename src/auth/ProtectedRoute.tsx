import {hasRole} from "./service";

export default function router(){

  localStorage.getItem('token')
  hasRole("ROLE_ADMIN") ? window.location.href = '/todos' : window.location.href = '/';

}
