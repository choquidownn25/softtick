import { Injectable, signal } from '@angular/core';
import { course } from 'src/app/pages/apps/courses/course';
import { courseList } from 'src/app/pages/apps/courses/courseData';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  public course = signal<course[]>(courseList);

  public getCourse(): course[] {
    return this.course();
  }
}
