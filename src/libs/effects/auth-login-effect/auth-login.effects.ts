import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthLoginActions} from "../../actions/auth-login-action/auth-login.actions";
import {catchError, exhaustMap, map, of, tap} from "rxjs";
import {AuthHttpService} from "../../services/auth-http-service/auth-http.service";
import {NavService} from "../../services/nav-service/nav.service";

@Injectable()
export class AuthLoginEffects {

  constructor(private actions$: Actions, private authHttp: AuthHttpService,
              private navService: NavService) {}

  loginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthLoginActions.authLogin),
    exhaustMap((action) => this.authHttp.getUsers().pipe(
      map((data) => {
        console.log('ALE Users Found: ' +  JSON.stringify(data));
        let idx =
          data.findIndex(user => user.user === action.user.user && user.pass === action.user.pass);
        if (idx !== -1) {
          return AuthLoginActions.authLoginSuccess(
            {path: action.path, user: action.user, users: data})
        } else {
          return AuthLoginActions.authLoginFailure(
            {error: 'Username / Password does not exist!', errHandler: action.errHandler})
        }
      }),
      catchError((err) => of(
        AuthLoginActions.authLoginFailure({error: 'Failed to load user details', errHandler: action.errHandler}
        )))
    ))
  ));

  loginSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthLoginActions.authLoginSuccess),
    tap((action) => {
      console.log('ALE Auth Success');
      sessionStorage.setItem('currentUser', JSON.stringify(action.user));
      //this.storeService.authenticationStatus$.next(true);
      this.navService.navigate(action.path);
    })
  ), {dispatch: false});

  loginErrorEffect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthLoginActions.authLoginFailure),
    tap((action) => {
      console.log('ALE Auth Error');
      action.errHandler(action.error);
    })
  ), {dispatch: false});
}
