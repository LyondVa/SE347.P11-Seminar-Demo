import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  templateUrl: './add-blog.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {
  blogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      this.blogService.addBlog(this.blogForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
