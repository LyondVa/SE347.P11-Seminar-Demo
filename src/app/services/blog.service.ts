import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private baseUrl = 'http://localhost:3000/blogs';

  constructor(private http: HttpClient) {}

  // Fetch all blogs
  getAllBlogs(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Fetch a single blog by ID
  getBlogById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Add a new blog
  addBlog(newBlog: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, newBlog);
  }

  // Remove a blog by ID
  removeBlog(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // Update an existing blog
  updateBlog(updatedBlog: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${updatedBlog.id}`, updatedBlog);
  }
}
