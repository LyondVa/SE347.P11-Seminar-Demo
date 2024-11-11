import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  articles: any[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.articles = blogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        imageUrl: blog.imageUrl || 'default-image-url.jpg' // Replace with actual image URL if available
      }));
    });
  }
}
