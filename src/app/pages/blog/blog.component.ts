import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommentSectionComponent } from '../../components/comment-section/comment-section.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  imports: [
    FormsModule,
    NgIf,
    CommentSectionComponent
  ],
  standalone: true
})
export class BlogComponent implements OnInit {
  blog: any;
  editableBlog: any;
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService // Inject the BlogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.blogService.getBlogById(id).subscribe((blog) => {
        this.blog = blog;
        this.editableBlog = { ...blog }; // Create a copy for editing
      });
    });
  }

  // Enable editing mode
  editBlog(): void {
    this.isEditing = true;
    this.editableBlog = { ...this.blog }; // Fresh copy for editing
  }

  // Save changes to the blog
  saveChanges(): void {
    this.blogService.updateBlog(this.editableBlog).subscribe((updatedBlog) => {
      this.blog = updatedBlog; // Update the displayed content with saved data
      this.isEditing = false;
    });
  }

  // Cancel editing mode
  cancelEdit(): void {
    this.isEditing = false;
  }
}
