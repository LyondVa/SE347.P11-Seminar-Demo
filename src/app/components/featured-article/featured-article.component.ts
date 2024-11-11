import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {NgIf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

interface Blog {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-featured-article',
  templateUrl: './featured-article.component.html',
  standalone: true,
  imports: [
    SlicePipe,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./featured-article.component.css']
})
export class FeaturedArticleComponent implements OnInit {
  featuredBlog: Blog | null = null;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.fetchFeaturedBlog();
  }

  fetchFeaturedBlog(): void {
    this.blogService.getBlogs().subscribe((blogs) => {
      if (blogs.length > 0) {
        this.featuredBlog = blogs[blogs.length - 1]; // Display the most recent blog as featured
      }
    });
  }
}
