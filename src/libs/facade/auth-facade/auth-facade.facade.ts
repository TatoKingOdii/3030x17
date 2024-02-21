import { Injectable } from '@angular/core';
import {User} from "../../model/user";
import {Observable, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {AuthLogoutActions} from "../../actions/auth-logout-action/auth-logout.actions";
import {AuthLoginActions} from "../../actions/auth-login-action/auth-login.actions";
import {ContentState} from "../../reducers/content-reducer/content.reducer";
import {selectAuthStatus} from "../../selectors/content-selector/content.selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  constructor(private store: Store<{content: ContentState}>) {
    // All a bit jank figure out a better way
  }

  getAuthStatus(): Observable<boolean> {
    return this.store.select(selectAuthStatus);
  }

  authenticate(user: User, path: string, errHandler: (msg: string) => void) {
    this.store.dispatch(AuthLoginActions.authLogin({user, path, errHandler}));
  }

  deauthenticate() {
    this.store.dispatch(AuthLogoutActions.authLogout());
  }
}
