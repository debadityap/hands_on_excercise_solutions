import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    const courseIdStr = this.route.snapshot.paramMap.get('id');
    if (courseIdStr) {
      // Subscribe to fetch the unique single course object matching the ID parameter
      this.courseService.getCourseById(Number(courseIdStr)).subscribe({
        next: (data) => {
          this.course = data;
        },
        error: (err) => {
          console.error('Course details fetch failed:', err);
        }
      });
    }
  }

}
