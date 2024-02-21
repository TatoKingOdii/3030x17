import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const LoadAuthActions = createActionGroup({
  source: 'LoadAuth',
  events: {
    'Load Auth': emptyProps(),
    'Load Auth Success': props<{ loggedIn: boolean }>(),
    'Load Auth Failure': props<{ error: string }>(),
  }
});
