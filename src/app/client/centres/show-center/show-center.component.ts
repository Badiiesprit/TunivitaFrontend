import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Image } from 'src/app/model/image';
import { CategoryService } from 'src/app/services/admin/category/category.service';
import { CenterService } from 'src/app/services/client/center/center.service';
import * as L from 'leaflet';
import { Icon, icon } from 'leaflet';


@Component({
  selector: 'app-show-center',
  templateUrl: './show-center.component.html',
  styleUrls: ['./show-center.component.scss']
})
export class ShowCenterComponent {
public thiscenter: any;
public baseurl = environment.url;
public images:Image[];
public messager:string;
public subject:string;
  constructor( private router: ActivatedRoute,
    private categoryService: CategoryService,
    private centerService: CenterService){

  }

  ngOnInit() {


    //this.initializeMap();
    this.router.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.centerService.getById(id).subscribe(
          (response:any) => {
            if (response.result) {
              this.thiscenter = response.result;
              this.initializeMap();
              console.log("response.result.image");
              this.images = this.thiscenter.image as Image[];
              console.log(response.result.image);
              // response.result.image.forEach((image:any) => {
              //   console.log(image);
              //   this.images.push(image);
              // });
            }
          }
        );
      }
    });
  }
  submitForm(){

    this.centerService.getSundMail(this.thiscenter._id,this.subject,this.messager).subscribe(
      (response:any) => {
        alert("maile sunded ! ")
      }
    );
    
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
    if (this.thiscenter.altitude !== undefined && this.thiscenter.longitude !== undefined && this.thiscenter.title !== undefined) {
      let marker = L.marker([parseFloat(this.thiscenter.altitude.toString()), parseFloat(this.thiscenter.longitude.toString())] , { icon: greenIconMap }).addTo(map)
      .bindPopup(this.thiscenter.title.toString()).openPopup();
    }
  }
}
