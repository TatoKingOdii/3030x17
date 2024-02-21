import { ResolveFn } from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {Item} from "../../model/item";
import {ContentState} from "../../reducers/content-reducer/content.reducer";
import {select, Store} from "@ngrx/store";
import {selectContentList, selectLoadSubscription} from "../../selectors/content-selector/content.selectors";
import {filter, Observable, tap} from "rxjs";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";

export const idLoadedResolver: ResolveFn<Observable<Item[] | null>> = (route, state) => {
  // Need to revisit since it should be on the contentSubscription$
  return inject(IdResolver).resolve();
};

@Injectable()
export class IdResolver {
  store: Store<{content: ContentState}> = inject(Store<{content: ContentState}>);

  resolve(): Observable<Item[] | null> {
    console.log('ID Resolver');
    return this.store.select(selectContentList)
      .pipe(
        tap(() => this.store.dispatch(LoadContentActions.loadContents())),
        filter(content => content !== null && content.length > 0)
      );
  }

}
