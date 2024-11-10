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
  articles:any = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.articles = this.blogService.getAllBlogs();
  }
}
