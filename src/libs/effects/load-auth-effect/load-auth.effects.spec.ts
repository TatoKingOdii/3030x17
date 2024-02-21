import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoadAuthEffects } from './load-auth.effects';

describe('LoadAuthEffects', () => {
  let actions$: Observable<any>;
  let effects: LoadAuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadAuthEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LoadAuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
