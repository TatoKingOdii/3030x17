import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Item} from "../../model/item";
import {Observable} from "rxjs";

export const LoadContentActions = createActionGroup({
  source: 'LoadContent',
  events: {
    'Load Contents': emptyProps(),
    'Load Content Triggered': props<{ subscription: Observable<Item[]> }>(),
    'Load Contents Success': props<{ content: Item[] }>(),
    'Load Contents Failure': props<{ error: string }>(),
  }
});
