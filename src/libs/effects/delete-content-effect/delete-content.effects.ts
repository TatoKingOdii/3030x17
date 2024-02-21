import { Injectable } from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {ContentService} from "../../services/content-service/content.service";
import {catchError, EMPTY, exhaustMap, map, switchMap, take, tap, withLatestFrom} from "rxjs";
import {DeleteContentActions} from "../../actions/delete-content-action/delete-content.actions";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";
import {Store} from "@ngrx/store";
import {ContentState} from "../../reducers/content-reducer/content.reducer";
import {selectSelectedContent} from "../../selectors/content-selector/content.selectors";

@Injectable()
export class DeleteContentEffects {

  constructor(private actions$: Actions, private contentService: ContentService, private store: Store<{content: ContentState}>) {}

  // Initial delete handler
  deleteContent$ = createEffect(() => this.actions$.pipe(
    ofType(DeleteContentActions.deleteContent),
    exhaustMap( (action) =>
      this.contentService.deleteContent(action.content).pipe(
        tap(value => console.log('DCE Delete Content Res: ' + JSON.stringify(action.content))),
        map((value) => DeleteContentActions.deleteContentSuccess({id: action.content.id})),
        catchError(() => EMPTY))
    )
  ));

  // reload content on successful delete
  deleteContentSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(DeleteContentActions.deleteContentSuccess),
    map(LoadContentActions.loadContents)
  ));

  // Cleanup of selected item if it was the deleted item
  determineResetOnDelete$ = createEffect(() => this.actions$.pipe(
    ofType(DeleteContentActions.deleteContentSuccess),
    concatLatestFrom(action => this.store.select(selectSelectedContent)),
    map(([action, selectedContent]) => {
      // This is jank
      console.log('DCE Delete with id check for: ' + selectedContent?.id);
      if (selectedContent?.id === action.id) {
        this.contentService.resetSelectedContent();
        return DeleteContentActions.deleteSelectedContentSuccess();
      } else {
        return DeleteContentActions.deleteNoOp();
      }
    })
  ));
}
