import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrontEndService {

  constructor() { }


  private blog: any;

  setBlog(blog: any) {
    this.blog = blog;
  }

  getBlog() {
    return this.blog;
  }

  clearBlog() {
    this.blog = null;
  }
}
