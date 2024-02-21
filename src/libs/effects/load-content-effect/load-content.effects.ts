import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, exhaustMap, map, tap} from "rxjs";
import {ContentService} from "../../services/content-service/content.service";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";

@Injectable({
  providedIn: 'root'
})
export class LoadContentEffects {
  constructor(private actions$: Actions, private contentService: ContentService) {}

  // Initial content load handler
  contentLoadEffect$ = createEffect(() => this.actions$.pipe(
    ofType(LoadContentActions.loadContents),
    tap(value => console.log('LCE Load Content Triggered')),
    map(action =>
      LoadContentActions.loadContentTriggered({subscription: this.contentService.loadContent()}))
  ));

  contentLoadTriggeredEffect$ = createEffect(() => this.actions$.pipe(
    ofType(LoadContentActions.loadContentTriggered),
    exhaustMap((action) => action.subscription.pipe(
      tap(value => console.log('LCE Load Content Res: ' + JSON.stringify(value))),
      map(content => LoadContentActions.loadContentsSuccess({content})),
      catchError(() => EMPTY)
    ))
  ));
}
