import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../service/auth.service';



export const authGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);
  let router = inject(Router);
  if (auth.connectedId >= 0){
    console.log("vous êtes connecté")
    return true;
  }
  console.log("vous êtes pas connecté, redirection");
  return router.parseUrl('/login');
};
