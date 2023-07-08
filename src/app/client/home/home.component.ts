import { Component ,OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() { }

  ngOnInit(): void {
    this.slides = [
      {
        id: 0,
        src: 'https://picsum.photos/seed/picsum/1200/500',
        title: 'First slide',
        subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
      },
      {
        id: 1,
        src: 'https://picsum.photos/seed/picsum/1200/500',
        title: 'Second slide',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: 2,
        src: 'https://picsum.photos/seed/picsum/1200/500',
        title: 'Second slide',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: 3,
        src: 'https://picsum.photos/seed/picsum/1200/500',
        title: 'Second slide',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: 4,
        src: 'https://picsum.photos/seed/picsum/1200/500',
        title: 'Second slide',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ];
  }
}