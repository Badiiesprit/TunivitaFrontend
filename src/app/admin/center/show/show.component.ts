import { Component } from '@angular/core';
import { Center } from '../../../model/center';
import { Category } from '../../../model/category';
import { CenterService } from 'src/app/services/admin/center/center.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Image } from 'src/app/model/image';
import * as L from 'leaflet';
import { Icon, icon } from 'leaflet';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {
  public center:Center;
  public baseurl = environment.url;
  public image:any[];
  public slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor(private route:ActivatedRoute ,private centerService: CenterService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.centerService.getById(id).subscribe(
          (response) => {
            if (response.result) {
              this.center = response.result;
              this.initializeMap();
              const images = this.center.image ? [...this.center.image] : [null];
              let index_image = 0;
              images.forEach(image => {
                let img = image as Image;
                this.slides[index_image++] = {
                  src: environment.url+img.path,
                };
              });
              console.log(this.slides);

            }
          }
        );
      }
    });

  }

  initializeMap() {
    const map = L.map('map').setView([36.85329514812128 , 10.20709812641144], 13); // Set the initial center and zoom level
    const greenIconMap = icon({
      iconUrl: 'assets/images/map.png',
      iconSize: [30, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
    }).addTo(map);
    if (this.center.altitude !== undefined && this.center.longitude !== undefined && this.center.title !== undefined) {
      let marker = L.marker([parseFloat(this.center.altitude.toString()), parseFloat(this.center.longitude.toString())] , { icon: greenIconMap }).addTo(map)
      .bindPopup(this.center.title.toString()).openPopup();
    }
  }

}
