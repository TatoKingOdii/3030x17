import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import {INJECTABLES, routes} from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideClientHydration} from "@angular/platform-browser";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideNativeDateAdapter} from "@angular/material/core";
import {provideEffects} from "@ngrx/effects";
import {LoadContentEffects} from "../libs/effects/load-content-effect/load-content.effects";
import {provideStore} from "@ngrx/store";
import {AddContentEffects} from "../libs/effects/add-content-effect/add-content.effects";
import {UpdateContentEffects} from "../libs/effects/update-content-effect/update-content.effects";
import {DeleteContentEffects} from "../libs/effects/delete-content-effect/delete-content.effects";
import {AuthLoginEffects} from "../libs/effects/auth-login-effect/auth-login.effects";
import {AuthLogoutEffects} from "../libs/effects/auth-logout-effect/auth-logout.effects";
import {contentReducer} from "../libs/reducers/content-reducer/content.reducer";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {LoadAuthEffects} from "../libs/effects/load-auth-effect/load-auth.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(
      [LoadContentEffects,
        AddContentEffects,
        UpdateContentEffects,
        DeleteContentEffects,
        AuthLoginEffects,
        AuthLogoutEffects,
        LoadAuthEffects]),
    provideStore({content: contentReducer}),
    provideStoreDevtools({maxAge: 25}),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideNativeDateAdapter(),
    ...INJECTABLES
    ]
};
