import { Component , OnInit , AfterViewInit  } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CenterService } from '../../services/client/center/center.service';
import { ServiceService } from '../../services/admin/service/service.service';

import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Icon, icon } from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { Center } from 'src/app/model/center';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public centers: any[] = new Array(0);
  public services: any[] = new Array(0);

  public baseurl = environment.url ;
  public slides: any[] = new Array(0);
  public latitude:any ;
  public longitude:any;
  public TopCente: any[] = new Array(0);
  public DistanceCente: any[] = new Array(0);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private centerService : CenterService,
    private serviceService : ServiceService

    ) {
    this.latitude = 36.85329514812128;
    this.longitude = 10.20709812641144;
    if(localStorage.getItem('latitude')){
      this.latitude = localStorage.getItem('latitude');
    }
    if(localStorage.getItem('longitude')){
      this.longitude = localStorage.getItem('longitude');
    }
  }

  // async ngAfterViewInit(): Promise<void> {
  //   await this.centerService.getTopCenter(10).subscribe(
  //     (response:any) => {
  //       console.log("getTopCenter");
  //       console.log(response);
  //       let index = 0;
  //       response.result.forEach((center:any) => {
  //         this.slides.push({
  //           id: index++,
  //           src: environment.url+center.image[0].path,
  //           title: center.title,
  //           subtitle: center.description,
  //         })
  //       });
  //       console.log(this.slides);

  //     },
  //     (error) => {
  //       console.error('Error fetching centers:', error);
  //     }
  //   );
  // }


  ngOnInit(): void {


    this.centerService.getTopCenter(10).subscribe(
      (response:any) => {this.centers=response.result});
    this.initializeMap();

    this.serviceService.getAll().subscribe(
      (response) => {this.services=response.services});



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
    this.centerService.getCenterByDistance(4000).subscribe(
      (response:any) => {
        if (response.result) {

          response.result.forEach((center:any )=> {

            if (center.center.altitude !== undefined && center.center.longitude !== undefined && center.center.title !== undefined) {
              const popupContent = `
                <div style="text-align: center">
                  <p>le centre <b>${center.center.title}</b> est situé à environ <b>${center.distance}M</b> de vous</p>
                  <img src="${environment.url}${center.center.image[0].path}" alt="Center Image" style="width: 100px; height: 100px;border-radius: 5%;" />
                </div>
              `;
              let marker = L.marker([parseFloat(center.center.altitude.toString()), parseFloat(center.center.longitude.toString())], { icon: greenIconMap }).addTo(map)
              .bindPopup(popupContent);
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
      iconUrl: 'assets/images/man.png',
      iconSize: [30, 55],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });
    let marker = L.marker([this.latitude ,this.longitude], { icon: greenIcon }).addTo(map) .bindPopup("Votre position actuelle");

  }

  showcenter(id:any){
    this.router.navigate(['/centers/show/'+id]);
  }
  showservice(id:any){
    this.router.navigate(['/client/services/show/'+id]);
  }

}
