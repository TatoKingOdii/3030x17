import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {filter, of, switchMap, take, tap} from "rxjs";
import {ContentState} from "../../reducers/content-reducer/content.reducer";
import {select, Store} from "@ngrx/store";
import {AuthFacade} from "../../facade/auth-facade/auth-facade.facade";
import {selectAuthStatus} from "../../selectors/content-selector/content.selectors";
import {LoadAuthActions} from "../../actions/load-auth-action/load-auth.actions";

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate(route, state);
};

@Injectable()
export class AuthGuard {
  store: Store<{content: ContentState}> = inject(Store<{content: ContentState}>);
  router: Router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store
      .pipe(
        select(selectAuthStatus),
        tap(value => {
          console.log('AG AuthGPre: ' + value);
          this.store.dispatch(LoadAuthActions.loadAuth());
        }),
        filter(value => value !== null && value !== undefined ),
        take(1),
        tap(value => {
          if (!value) {
            this.router.navigateByUrl('/login');
          }
          console.log('AG AuthGPost: ' + value);
        }),
      )
  }
}
