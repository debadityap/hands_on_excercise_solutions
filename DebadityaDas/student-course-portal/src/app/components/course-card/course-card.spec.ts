import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CourseCard } from './course-card';

const { describe, beforeEach, it, expect, vi } = globalThis as any;

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;

    // Use official setInput initialization
    fixture.componentRef.setInput('course', mockCourse);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the course name in the template structure', async () => {
    // FIX: Using setInput to cleanly mock parent property binding updates
    fixture.componentRef.setInput('course', { ...mockCourse, name: 'Web Development' });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Web Development');
  });

  it('should emit enrollRequested event when triggerEnroll is executed', () => {
    const emitSpy = vi.spyOn(component.enrollRequested, 'emit');
    component.triggerEnroll();
    fixture.detectChanges();
    expect(emitSpy).toHaveBeenCalledWith(mockCourse.id);
  });

  it('should fire console.log inside ngOnChanges hook execution pipelines', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

    component.ngOnChanges({
      course: new SimpleChange(null, mockCourse, true)
    });

    expect(logSpy).toHaveBeenCalledWith('Course input changed:', mockCourse);
    logSpy.mockRestore();
  });
});
