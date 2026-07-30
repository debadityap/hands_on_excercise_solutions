import { createAction, props } from '@ngrx/store';

// Step 99: Action definitions for changing your registered selections
export const enrollInCourse = createAction(
    '[Enrollment] Enroll In Course',
    props<{ courseId: number }>()
);

export const unenrollFromCourse = createAction(
    '[Enrollment] Unenroll From Course',
    props<{ courseId: number }>()
);
