import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course';
import { Course } from '../models/course.model';
import { firstValueFrom } from 'rxjs';

const { describe, beforeEach, it, expect } = globalThis as any;

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Web Development', code: 'CS101', credits: 4, gradeStatus: 'passed' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve available courses via HTTP GET stream request arrays', async () => {
    const coursesPromise = firstValueFrom(service.getCourses());

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);

    const courses = await coursesPromise;
    expect(courses.length).toBe(1);
    expect(courses).toEqual(mockCourses);
    httpMock.verify();
  });

  it('should throw out an intercepted error stream if backend fails with 500', async () => {
    const coursesPromise = firstValueFrom(service.getCourses());

    // Try 1: Original request fails with 500, triggering retry #1
    const req1 = httpMock.expectOne('http://localhost:3000/courses');
    req1.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });

    // Try 2: Retry #1 fails with 500, triggering retry #2
    const req2 = httpMock.expectOne('http://localhost:3000/courses');
    req2.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });

    // Try 3: Retry #2 fails with 500, finally failing the observable stream completely
    const req3 = httpMock.expectOne('http://localhost:3000/courses');
    req3.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });

    try {
      await coursesPromise;
      throw new Error('Should have failed');
    } catch (err: any) {
      expect(err.message).toContain('Failed to load courses');
    }
    httpMock.verify();
  });
});
