import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from '../services/course';
import * as CourseActions from './actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CourseEffects {
    private actions$ = inject(Actions);
    private courseService = inject(CourseService);

    // Step 97: Intercept loadCourses action and trigger backend API
    loadCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.loadCourses),
            mergeMap(() =>
                this.courseService.getCourses().pipe(
                    map(courses => CourseActions.loadCoursesSuccess({ courses })),
                    catchError(error => of(CourseActions.loadCoursesFailure({ error: error.message || 'Error fetching tracks.' })))
                )
            )
        )
    );
}
