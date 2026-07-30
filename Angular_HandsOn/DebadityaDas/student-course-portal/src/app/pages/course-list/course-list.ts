import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Course } from '../../models/course.model';
import { CourseCard } from '../../components/course-card/course-card';

import * as CourseActions from '../../store/actions';
import * as CourseSelectors from '../../store/selector';
import * as EnrollActions from '../../store/enroll-actions';
import * as EnrollSelectors from '../../store/enroll-reducer';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.css']
})
export class CourseListComponent implements OnInit {
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  enrolledIds$: Observable<number[]>;

  constructor(private store: Store) {
    this.courses$ = this.store.select(CourseSelectors.selectAllCourses);
    this.isLoading$ = this.store.select(CourseSelectors.selectCoursesLoading);
    this.enrolledIds$ = this.store.select(EnrollSelectors.selectEnrolledIds);
  }

  ngOnInit(): void {
    // Step 96 & 97: Dispatches initial event load to boot up the async backend pipeline fetch
    this.store.dispatch(CourseActions.loadCourses());
  }

  // Step 100 implementation: Dispatches actions based on current click state checks
  onEnroll(courseId: any): void {
    const id = typeof courseId === 'object' && courseId?.id ? courseId.id : Number(courseId);

    this.enrolledIds$.pipe(take(1)).subscribe(ids => {
      if (ids.includes(id)) {
        this.store.dispatch(EnrollActions.unenrollFromCourse({ courseId: id }));
      } else {
        this.store.dispatch(EnrollActions.enrollInCourse({ courseId: id }));
      }
    });
  }
}
