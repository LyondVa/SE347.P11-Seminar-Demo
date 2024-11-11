import { Component } from '@angular/core';
import {FeaturedArticleComponent} from '../../components/featured-article/featured-article.component';
import {SideScrollComponent} from '../../components/side-scroll/side-scroll.component';
import {ItemGridComponent} from '../../components/carousel/item-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FeaturedArticleComponent,
    SideScrollComponent,
    ItemGridComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
