import { Component ,OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CenterService } from '../../services/client/center/center.service';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Icon, icon } from 'leaflet';
import { Center } from 'src/app/model/center';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  public latitude:any ;
  public longitude:any;
  constructor(private centerService : CenterService) {
    this.latitude = 36.85329514812128;
    this.longitude = 10.20709812641144;
    if(localStorage.getItem('latitude')){
      this.latitude = localStorage.getItem('latitude');
    }
    if(localStorage.getItem('longitude')){
      this.longitude = localStorage.getItem('longitude');
    }
  }

  ngOnInit(): void {

    this.initializeMap();

    this.centerService.getCenterByDistance(20).subscribe(
      (response:any) => {
        console.log(response);
      },
      (error) => {
        console.error('Error fetching centers:', error);
      }
    );

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




  initializeMap() {
    const map = L.map('map').setView([this.latitude ,this.longitude ], 13); // Set the initial center and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
    }).addTo(map);
    const greenIconMap = icon({
      iconUrl: 'assets/images/map.png',
      iconSize: [30, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });
    this.centerService.getAll().subscribe(
      (response:any) => {
        if (response.result) {
          const centers = response.result as Center[];
          centers.forEach(center => {
            console.log(center);
            
            if (center.altitude !== undefined && center.longitude !== undefined && center.title !== undefined) {
              let marker = L.marker([parseFloat(center.altitude.toString()), parseFloat(center.longitude.toString())], { icon: greenIconMap }).addTo(map)
              .bindPopup(center.title.toString());
              marker.on('mouseover', function (e) {
                marker.openPopup();
              });

              marker.on('mouseout', function (e) {
                marker.closePopup();
              });
            }
          });
        }
      }
    )
    const greenIcon = icon({
      iconUrl: 'assets/images/marker.png',
      iconSize: [35, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });
    let marker = L.marker([this.latitude ,this.longitude], { icon: greenIcon }).addTo(map) .bindPopup("Votre position actuelle");

    
  }



}