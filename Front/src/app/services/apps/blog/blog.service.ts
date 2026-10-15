import { Injectable, signal } from '@angular/core';
import { blogPosts } from 'src/app/pages/apps/blogs/blogData';

@Injectable({
  providedIn: 'root',
})
export class blogService {
  private blogPosts = signal<any[]>(blogPosts);
  private selectedPost = signal<any | null>(null);

  constructor() {}

  public getBlog() {
    return this.blogPosts();
  }

  public selectBlogPost(title: string) {
    const post = this.blogPosts().find((post) => post.title === title);
    this.selectedPost.set(post || null);
  }

  public getSelectedPost() {
    return this.selectedPost();
  }
}
