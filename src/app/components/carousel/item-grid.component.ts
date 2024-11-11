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
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.css']
})
export class ItemGridComponent implements OnInit {
  articles: any[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.articles = blogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        imageUrl: blog.imageUrl || 'default-image-url.jpg'
      }));
    });
  }
}
