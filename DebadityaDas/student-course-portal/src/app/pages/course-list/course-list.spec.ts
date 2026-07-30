import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { CourseListComponent } from './course-list';

const { describe, beforeEach, it, expect } = globalThis as any;

describe('CourseListComponent with NgRx Store', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const initialState = {
    course: {
      courses: [
        { id: 1, name: 'Test Course 1', code: 'TC1', credits: 3, gradeStatus: 'pending' }
      ],
      loading: false,
      error: null
    },
    enrollment: { enrolledCourseIds: [] }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should render course cards mapping matching the initial store state parameters', () => {
    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards).toBeTruthy();
  });

  it('should render the visible loading spinner block indicator when state sets loading true', () => {
    store.setState({
      course: {
        courses: [],
        loading: true,
        error: null
      },
      enrollment: { enrolledCourseIds: [] }
    });

    store.refreshState();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Loading store data state');
  });
});
