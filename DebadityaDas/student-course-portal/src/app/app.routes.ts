import { Routes } from '@angular/router';
import { CoursesLayoutComponent } from './components/courses-layout/courses-layout';
import { CourseListComponent } from './pages/course-list/course-list';
import { CourseDetailComponent } from './pages/course-detail/course-detail';
import { StudentProfileComponent } from './pages/student-profile/student-profile';
import { NotFoundComponent } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard'; // Import Auth Guard
import { unsavedChangesGuard } from './guards/unsaved-changes-guard'; // Import Unsaved Guard

export const routes: Routes = [
    { path: '', redirectTo: 'courses', pathMatch: 'full' },

    {
        path: 'courses',
        component: CoursesLayoutComponent,
        children: [
            { path: '', component: CourseListComponent },
            { path: ':id', component: CourseDetailComponent }
        ]
    },

    // Step 73 (Lazy Loading) & Step 77 (CanDeactivate Guard application)
    {
        path: 'enroll-reactive',
        loadComponent: () => import('./pages/reactive-enrollment-form/reactive-enrollment-form')
            .then(m => m.ReactiveEnrollmentFormComponent),
        canDeactivate: [unsavedChangesGuard]
    },

    // Step 76: Protecting Profile path utilizing CanActivate Guard
    {
        path: 'profile',
        component: StudentProfileComponent,
        canActivate: [authGuard]
    },

    { path: '**', component: NotFoundComponent }
];
