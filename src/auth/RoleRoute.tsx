import {Navigate} from "react-router";
import {hasRole} from "./service";

export function RoleRoute({ children, requiredRole }: Readonly<{
  children: React.ReactNode;
  requiredRole: string | string[]
}>) {

  //liste des roles autorisés pour accéder à la page
  const authorizedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  let hasRequiredRole = false;
  for (const role of authorizedRoles) {
    if (hasRole(role)) {
      hasRequiredRole = true;
      break;
    }
  }

  if ( hasRequiredRole ) {
    return children;
  }
  return <Navigate to="/" replace/>;
}
