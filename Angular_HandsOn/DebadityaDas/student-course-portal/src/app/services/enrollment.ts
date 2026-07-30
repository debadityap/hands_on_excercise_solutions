import { Injectable } from '@angular/core';
import { CourseService } from './course';
import { Course } from '../models/course.model';
import { Observable, forkJoin, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EnrollmentService {
    private enrolledCourseIds: number[] = [];

    constructor(private courseService: CourseService) { }

    enroll(courseId: number): void {
        if (!this.isEnrolled(courseId)) {
            this.enrolledCourseIds.push(courseId);
        }
    }

    unenroll(courseId: number): void {
        this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
    }

    isEnrolled(courseId: number): boolean {
        return this.enrolledCourseIds.includes(courseId);
    }

    // Refactored to return an Observable array to map asynchronous network stream resolutions cleanly
    getEnrolledCourses(): Observable<Course[]> {
        if (this.enrolledCourseIds.length === 0) {
            return of([]); // Return an empty observable stream if no courses are selected
        }

        // Combine all independent backend network requests into one unified array stream
        const requests = this.enrolledCourseIds.map(id => this.courseService.getCourseById(id));
        return forkJoin(requests);
    }
}
