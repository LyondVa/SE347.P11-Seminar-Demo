import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {BlogService} from '../../services/blog.service';
import {NgForOf, NgIf} from '@angular/common';
import {TruncatePipe} from '../../pipes/truncate.pipe';

interface Blog {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    TruncatePipe
  ],
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string = '';
  filteredBlogs: Blog[] = [];

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      this.performSearch();
    });
  }

  performSearch(): void {
    this.blogService.getBlogs().subscribe((blogs) => {
      this.filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(this.query.toLowerCase()) ||
        blog.content.toLowerCase().includes(this.query.toLowerCase())
      );
    });
  }
}
