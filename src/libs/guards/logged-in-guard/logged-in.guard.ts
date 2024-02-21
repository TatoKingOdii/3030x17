import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {ContentState} from "../../reducers/content-reducer/content.reducer";
import {AuthFacade} from "../../facade/auth-facade/auth-facade.facade";
import {filter, of, switchMap, take, tap} from "rxjs";
import {selectAuthStatus} from "../../selectors/content-selector/content.selectors";
import {LoadAuthActions} from "../../actions/load-auth-action/load-auth.actions";
import {NavService} from "../../services/nav-service/nav.service";

export const loggedInGuard: CanActivateFn = (route, state) => {
  return inject(CanActivateLoggedInGuard).canActivate(route, state);
};

@Injectable()
export class CanActivateLoggedInGuard {
  private nav: NavService = inject(NavService);
  private store: Store<{content: ContentState}> = inject(Store<{content: ContentState}>);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // Send the user to the dashboard if they are already logged in
    this.store.pipe(
      select(selectAuthStatus),
      tap(value => console.log('LIG LoggedInPre: ' + value)),
      filter(value => value !== null && value !== undefined ),
      take(1),
      tap(value => {
        console.log('LIG LoggedInPost: ' + value);
        if (value) {
          this.nav.navigateDashboard();
        }
      }),
    );

    return true;
  }
}
