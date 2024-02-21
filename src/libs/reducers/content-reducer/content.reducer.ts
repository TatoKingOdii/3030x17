import { createReducer, on } from '@ngrx/store';
import {Item} from "../../model/item";
import {Observable} from "rxjs";
import {AddContentActions} from "../../actions/add-content-action/add-content.actions";
import {AuthLoginActions} from "../../actions/auth-login-action/auth-login.actions";
import {AuthLogoutActions} from "../../actions/auth-logout-action/auth-logout.actions";
import {DeleteContentActions} from "../../actions/delete-content-action/delete-content.actions";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";
import {LoadAuthActions} from "../../actions/load-auth-action/load-auth.actions";
import {SelectContentActions} from "../../actions/select-content-action/select-content.actions";

export interface ContentState {
  loggedIn: boolean,
  selectedContent: Item | null,
  contentList: Item[] | null,
  contentSubscription$: Observable<Item[]> | null
}

export const initialState: ContentState = {
  loggedIn: false,
  contentList: [],
  contentSubscription$: null,
  selectedContent: null
};

export const contentReducer = createReducer(
  initialState,
  on(LoadAuthActions.loadAuthSuccess,
    (state, {loggedIn}) => ({...state, loggedIn: loggedIn})),
  on(LoadContentActions.loadContentTriggered,
    (state, {subscription}) =>({...state, contentSubscription: subscription})),
  on(LoadContentActions.loadContentsSuccess,
    (state, {content}) => ({...state, contentList: content, contentSubscription: null})),
  on(AddContentActions.addContentSuccess, state => ({...state, selectedContent: null})),
  on(AuthLoginActions.authLoginSuccess, state => ({...state, loggedIn: true})),
  on(AuthLoginActions.authLoginFailure, state => ({...state, loggedIn: false})),
  on(AuthLogoutActions.authLogout, state => ({...state, loggedIn: false})),
  on(DeleteContentActions.deleteSelectedContentSuccess, state => ({...state, selectedContent: null})),
  on(SelectContentActions.selectContent, (state, {content}) => ({...state, selectedContent: content}))
);

