import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Needed for *ngIf and *ngFor

// Step 53: Custom Synchronous Validator function
function noCourseCode(control: AbstractControl): ValidationErrors | null {
  if (control.value && control.value.startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Step 55: Custom Async Validator function
function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (control.value && control.value.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Added CommonModule for template directives
  templateUrl: './reactive-enrollment-form.html',
  styleUrls: ['./reactive-enrollment-form.css']
})
export class ReactiveEnrollmentFormComponent implements OnInit {
  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  // Step 57: Typed getter for additionalCourses FormArray
  /* 
    Explanation: 
    Using a typed getter is better than inline casting in the template because:
    1. It keeps complex logic and data type assertions out of the view layer.
    2. It enables full TypeScript compile-time type safety and IDE auto-complete.
  */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      // Step 55: Add async validator as the third array item
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      // Step 53: Apply noCourseCode alongside Validators.required
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      // Step 56: Add FormArray for dynamic repeating fields
      additionalCourses: this.fb.array([])
    });
  }

  // Step 56: Add method to push a new control into the array
  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  // Step 56: Add method to remove a control from the array
  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    console.log('Form Value:', this.enrollForm.value);
    console.log('Form Raw Value:', this.enrollForm.getRawValue());
  }
}
