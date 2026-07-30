import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry, tap } from 'rxjs/operators'; // Clean imports for Task 2 operators
import { Course } from '../models/course.model';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private apiUrl = 'http://localhost:3000/courses';

    constructor(private http: HttpClient) { }

    // Step 83, 84, 85, 86: Chained RxJS pipeline transformations
    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.apiUrl).pipe(
            // Step 83: Only stream courses with 3 or more credits
            map(courses => courses.filter(c => c.credits >= 3)),

            // Step 85: Tap operator for logging side-effects
            tap(courses => console.log(`RxJS Tap Log: Courses loaded. Total: ${courses.length}`)),

            // Step 86: Retry failed network actions up to 2 times
            retry(2),

            // Step 84: Catch network failures gracefully
            catchError(err => {
                console.error('Interception caught a network failure:', err);
                return throwError(() => new Error('Failed to load courses. Please check your backend connection.'));
            })
        );
    }

    getCourseById(id: number): Observable<Course> {
        return this.http.get<Course>(`${this.apiUrl}/${id}`);
    }

    createCourse(course: Omit<Course, 'id'>): Observable<Course> {
        return this.http.post<Course>(this.apiUrl, course);
    }

    updateCourse(course: Course): Observable<Course> {
        return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course);
    }

    deleteCourse(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
