import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as EnrollActions from './enroll-actions';
import * as CourseSelectors from './selector';

export interface EnrollmentState {
    enrolledCourseIds: number[];
}

export const initialState: EnrollmentState = {
    enrolledCourseIds: []
};

export const enrollmentReducer = createReducer(
    initialState,
    on(EnrollActions.enrollInCourse, (state, { courseId }) => {
        if (state.enrolledCourseIds.includes(courseId)) return state;
        return { ...state, enrolledCourseIds: [...state.enrolledCourseIds, courseId] };
    }),
    on(EnrollActions.unenrollFromCourse, (state, { courseId }) => ({
        ...state,
        enrolledCourseIds: state.enrolledCourseIds.filter(id => id !== courseId)
    }))
);

// Step 99 selectors setup
export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(
    selectEnrollmentState,
    (state: EnrollmentState) => state.enrolledCourseIds
);
