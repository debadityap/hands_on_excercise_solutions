import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 1. Imported Router for programmatic navigation
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, Highlight, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {
  @Input() course!: { id: number; name: string; code: string; credits: number; gradeStatus: string };
  @Output() enrollRequested = new EventEmitter<number>();

  isEnrolled: boolean = false;
  isExpanded: boolean = false;

  // 2. Injected Router securely into the constructor layer
  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('Course input changed:', changes['course'].currentValue);
    }
  }

  triggerEnroll(): void {
    this.isEnrolled = true;
    this.enrollRequested.emit(this.course.id);
  }

  // 3. Step 70 implementation: Programmatic router details view trigger
  goToDetails(): void {
    this.router.navigate(['/courses', this.course.id]);
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  get cardClasses() {
    return {
      'card-enrolled': this.isEnrolled,
      'card-full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  getLeftBorderColor(): string {
    switch (this.course.gradeStatus) {
      case 'passed': return 'green';
      case 'failed': return 'red';
      case 'pending': return 'grey';
      default: return 'transparent';
    }
  }
}
