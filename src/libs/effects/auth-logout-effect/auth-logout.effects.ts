import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthLogoutActions} from "../../actions/auth-logout-action/auth-logout.actions";
import {tap} from "rxjs";

@Injectable()
export class AuthLogoutEffects {
  constructor(private actions$: Actions) {}

  logoutEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthLogoutActions.authLogout),
    tap(() => {
      console.log('ALE Auth Logout');

      //this.storeService.authenticationStatus$.next(false);
      sessionStorage.removeItem('currentUser');
    })
  ), {dispatch: false});
}
