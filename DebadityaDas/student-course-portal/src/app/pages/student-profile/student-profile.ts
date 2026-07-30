import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrls: ['./student-profile.css']
})
export class StudentProfileComponent implements OnInit {
  enrolledCourses: Course[] = [];

  constructor(private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {
    this.refreshEnrollments();
  }

  refreshEnrollments(): void {
    // Unpack the updated enrollment array stream safely
    this.enrollmentService.getEnrolledCourses().subscribe(data => {
      this.enrolledCourses = data;
    });
  }

  dropCourse(courseId: number): void {
    this.enrollmentService.unenroll(courseId);
    this.refreshEnrollments(); // Re-trigger mapping refresh
  }

}
