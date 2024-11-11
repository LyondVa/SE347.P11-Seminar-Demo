import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BlogService} from '../../services/blog.service';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

interface Blog {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blog: Blog | null = null;
  isEditing: boolean = false;
  editedTitle: string = '';
  editedContent: string = '';

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.fetchBlog(id);
  }

  fetchBlog(id: number): void {
    this.blogService.getBlog(id).subscribe((data) => {
      this.blog = data;
      this.editedTitle = data.title;
      this.editedContent = data.content;
    });
  }

  enableEditing(): void {
    this.isEditing = true;
  }

  saveChanges(): void {
    if (this.blog) {
      const updatedBlog = { title: this.editedTitle, content: this.editedContent };
      this.blogService.updateBlog(this.blog.id, updatedBlog).subscribe(() => {
        this.blog!.title = this.editedTitle;
        this.blog!.content = this.editedContent;
        this.isEditing = false;
      });
    }
  }

  cancelEditing(): void {
    this.isEditing = false;
    if (this.blog) {
      this.editedTitle = this.blog.title;
      this.editedContent = this.blog.content;
    }
  }

  deleteBlog(): void {
    if (this.blog) {
      this.blogService.deleteBlog(this.blog.id).subscribe(() => {
        this.router.navigate(['/']); // Redirect to home page after deletion
      });
    }
  }
}
