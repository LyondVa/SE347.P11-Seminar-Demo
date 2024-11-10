import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import {CommentSectionComponent} from '../../components/comment-section/comment-section.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  standalone: true,
  imports: [
    CommentSectionComponent,
    NgIf
  ],
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blog: any;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    const blogId = +this.route.snapshot.paramMap.get('id')!;
    this.blog = this.blogService.getBlogById(blogId);
  }
}
