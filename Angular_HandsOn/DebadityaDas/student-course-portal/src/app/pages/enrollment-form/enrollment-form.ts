import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // ⚠️ Crucial for template forms & validation directives
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentForm {
  // Step 46: Form submission state tracker flag variable
  isSubmitted: boolean = false;

  // Form bound tracking object keys mapping defaults structure parameters configurations
  formData = {
    studentName: '',
    studentEmail: '',
    courseId: null,
    preferredSemester: '',
    agreeToTerms: false
  };

  // Step 40 & 46: Handle submit execution pipeline tracking states
  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Form Value Object:', form.value);
      console.log('Form Validity State:', form.valid);
      this.isSubmitted = true;
    }
  }
}
