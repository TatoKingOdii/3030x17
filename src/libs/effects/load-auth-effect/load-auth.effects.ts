import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LoadAuthActions} from "../../actions/load-auth-action/load-auth.actions";
import {map} from "rxjs";


@Injectable()
export class LoadAuthEffects {


  constructor(private actions$: Actions) {}

  loadAuth$ = createEffect(() => this.actions$.pipe(
    ofType(LoadAuthActions.loadAuth),
    map(() => {
      const storageUser = sessionStorage.getItem('currentUser');
      console.log('LAE AuthLC: ' + storageUser);
      return LoadAuthActions.loadAuthSuccess({loggedIn: storageUser !== null});
    })
  ));
}
