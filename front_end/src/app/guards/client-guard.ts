import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const clientGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('access_token');
  const role = sessionStorage.getItem('role');

  // Vérifie que l'utilisateur est connecté ET est admin
  if (token && role === 'client') {
    return true;
  }

  // Redirection vers login s’il n’est pas admin ou pas connecté
  router.navigate(['/login']);
  return false;
};
