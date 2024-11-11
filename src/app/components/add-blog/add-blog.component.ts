import { Component } from '@angular/core';
import {BlogService} from '../../services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  standalone: true
})
export class AddBlogComponent {
  title = '';
  content = '';

  constructor(private blogService: BlogService) {}

  addBlog() {
    if (this.title && this.content) {
      this.blogService.addBlog({ title: this.title, content: this.content }).subscribe(() => {
        this.title = '';
        this.content = '';
        // Optionally, refresh the list or navigate away
      });
    }
  }
}
