import { createReducer, on } from '@ngrx/store';
import { Course } from '../models/course.model';
import * as CourseActions from './actions';

// 1. Reducer State setup
export interface CourseState {
    courses: Course[];
    loading: boolean;
    error: string | null;
}

export const initialState: CourseState = {
    courses: [],
    loading: false,
    error: null
};

export const courseReducer = createReducer(
    initialState,
    on(CourseActions.loadCourses, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
        ...state,
        loading: false,
        courses: courses
    })),
    on(CourseActions.loadCoursesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    }))
);

// 2. Asynchronous Side-Effects setup (Moved here so path resolution works perfectly)
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from '../services/course';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CourseEffects {
    private actions$ = inject(Actions);
    private courseService = inject(CourseService);

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
