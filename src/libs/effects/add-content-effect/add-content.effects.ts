import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ContentService} from "../../services/content-service/content.service";
import {AddContentActions} from "../../actions/add-content-action/add-content.actions";
import {catchError, EMPTY, exhaustMap, map, tap} from "rxjs";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";
import {SelectContentActions} from "../../actions/select-content-action/select-content.actions";
import {DEFAULT_ITEM} from "../../model/item";

@Injectable()
export class AddContentEffects {

  constructor(private actions$: Actions, private contentService: ContentService) {}

  // Initial add handler
  addContent$ = createEffect(() => this.actions$.pipe(
    ofType(AddContentActions.addContent),
    exhaustMap( (action) =>
      this.contentService.addContent(action.content).pipe(
        tap(value => console.log('ACE Add Content Res: ' + JSON.stringify(value))),
        map(AddContentActions.addContentSuccess),
        catchError(() => EMPTY))
    ))
  );

  // Refresh on success
  addContentSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AddContentActions.addContentSuccess),
    tap(() => console.log('ACE Add Success Refreshing!')),
    map(LoadContentActions.loadContents)
  ));

  //Reset content in the form on success
  resetOnAddSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AddContentActions.addContentSuccess),
    tap(() => console.log('ACE Add Success Clearing')),
    map(() => SelectContentActions.selectContent({content: DEFAULT_ITEM}))
  ));
}
