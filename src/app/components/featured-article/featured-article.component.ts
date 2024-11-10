import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import {RouterLink} from '@angular/router';
import {NgIf, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-featured-article',
  templateUrl: './featured-article.component.html',
  standalone: true,
  imports: [
    RouterLink,
    SlicePipe,
    NgIf
  ],
  styleUrls: ['./featured-article.component.css']
})
export class FeaturedArticleComponent implements OnInit {
  featuredArticle: any;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.featuredArticle = this.blogService.getBlogById(1);
  }
}
