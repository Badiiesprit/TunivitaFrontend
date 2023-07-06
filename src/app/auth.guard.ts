import { CanActivateFn ,Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  // Votre logique de contrôle d'accès ici
  const token = localStorage.getItem('token');
  if (token != "") {
    return true; // Autoriser l'accès à la route
  } else {
    const router = new Router();
    router.navigate(['/login']); // Rediriger vers une page d'erreur d'autorisation
    return false; // Bloquer l'accès à la route
  }
};
