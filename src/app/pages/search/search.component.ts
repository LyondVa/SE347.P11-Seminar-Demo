import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgForOf, NgIf, SlicePipe } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    SlicePipe,
    TruncatePipe
  ],
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string = '';
  filteredBlogs: any[] = [];
  blogs: any[] = [];

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.blogs = blogs;
      this.searchBlogs();
    });

    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      this.searchBlogs();
    });
  }

  searchBlogs() {
    if (this.query) {
      this.filteredBlogs = this.blogs.filter(blog =>
        blog.title.toLowerCase().includes(this.query.toLowerCase()) ||
        blog.content.toLowerCase().includes(this.query.toLowerCase())
      );
    }
  }
}
