import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutComponent } from './pages/about/about.component';
import {SearchComponent} from './pages/search/search.component';
import {AddBlogComponent} from './components/add-blog/add-blog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog/:id', component: BlogComponent },
  { path: 'about', component: AboutComponent },
  { path: 'search', component: SearchComponent },
  { path: 'add-blog', component: AddBlogComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
