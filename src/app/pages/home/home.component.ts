import { Component } from '@angular/core';
import {FeaturedArticleComponent} from '../../components/featured-article/featured-article.component';
import {SideScrollComponent} from '../../components/side-scroll/side-scroll.component';
import {CarouselComponent} from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FeaturedArticleComponent,
    SideScrollComponent,
    CarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
