import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  liveCourseCount: number = 0;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.updateCount();
  }

  updateCount(): void {
    // Subscribe to count the returned elements dynamically
    this.courseService.getCourses().subscribe(data => {
      this.liveCourseCount = data.length;
    });
  }

  simulateAddingCourse(): void {
    const nextId = this.liveCourseCount + 1;
    const newCourse = {
      name: `Advanced Elective ${nextId}`,
      code: `CS20${nextId}`,
      credits: 3,
      gradeStatus: 'pending' as const
    };

    // Step 81: Call your backend creation endpoint on button trigger
    this.courseService.createCourse(newCourse).subscribe(() => {
      this.updateCount(); // Reload count from db after insertion completes
    });
  }
}
