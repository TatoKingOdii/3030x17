import {ContentState} from "../../reducers/content-reducer/content.reducer";
import {Item} from "../../model/item";
import {Observable} from "rxjs";
import {createSelector} from "@ngrx/store";

export const selectSelectedContent = createSelector(
  (state: {content: ContentState}) => {
    console.log('SL Selected content: ' + JSON.stringify(state.content.selectedContent));
    return state.content.selectedContent;
  },
  (selectedContent: Item | null) => selectedContent
);

export const selectContentList = createSelector(
  (state: {content: ContentState}) => {
    console.log('SL Content List: ' + JSON.stringify(state.content.contentList));
    return state.content.contentList
  },
  (contentList: Item[] | null ) => contentList
);

export const selectLoadSubscription = createSelector(
  (state: {content: ContentState}) => {
    console.log('SL Subscription: ' + state.content.contentSubscription$);
    return state.content.contentSubscription$;
  },
  (contentSubscription: Observable<Item[]> | null) => contentSubscription
);

export const selectAuthStatus = createSelector(
  (state: {content: ContentState}) => {
    //console.log('SL State: ' + JSON.stringify(state));
    console.log('SL Auth: ' + state.content.loggedIn);
    return state.content.loggedIn
  },
  (loggedIn: boolean) => loggedIn
);
