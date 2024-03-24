import {ActivatedRouteSnapshot, CanActivateChildFn, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from "rxjs";


export const profileGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  console.log('【CanActivate守卫：进入当前路由】----------------------------------------', route.url.toString(), state);
  return true;
};
