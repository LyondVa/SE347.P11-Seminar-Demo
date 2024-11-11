import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

interface Blog {
  id: number;
  title: string;
  content: string;
}

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
  recentBlogs: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.fetchRecentBlogs();
  }

  fetchRecentBlogs(): void {
    this.blogService.getBlogs().subscribe((blogs) => {
      this.recentBlogs = blogs.slice(-5); // Get the last 5 blogs for recent articles
    });
  }
}
