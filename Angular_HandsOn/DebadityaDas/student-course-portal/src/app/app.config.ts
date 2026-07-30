import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';

// FIXED: Both reducer and effects are imported from the same working file path now
import { courseReducer, CourseEffects } from './store/reducer';
import { enrollmentReducer } from './store/enroll-reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const secureReq = req.clone({
            setHeaders: { Authorization: 'Bearer mock-token-12345' }
          });
          return next(secureReq);
        }
      ])
    ),

    provideStore({
      course: courseReducer,
      enrollment: enrollmentReducer
    }),

    // Successfully boots the effects channel using the bundled file class reference
    provideEffects(CourseEffects),

    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
