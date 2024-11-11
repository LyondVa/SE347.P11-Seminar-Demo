import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-side-scroll',
  templateUrl: './side-scroll.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./side-scroll.component.css']
})
export class SideScrollComponent implements OnInit {
  blogs: any[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.blogs = blogs;
    });
  }
}
