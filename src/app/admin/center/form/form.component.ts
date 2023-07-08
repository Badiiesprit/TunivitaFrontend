import { Component , OnInit } from '@angular/core';
import { Center } from '../../../model/center';
import { Category } from '../../../model/category';
import { CenterService } from '../../../services/admin/center/center.service';
import { CategoryService } from '../../../services/admin/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { cilCheck } from '@coreui/icons';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Icon, icon } from 'leaflet';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  icons = { cilCheck };
  public thiscenter: any;
  public selectedFile: FileList; // Variable pour stocker le fichier sélectionné
  public loading: boolean;
  public messageIsUnread: boolean = false;
  public messageIsError: boolean = false;
  public messageText: string;
  public addform: boolean = true;
  public categorys: Category[] = [];

  constructor(
    private http: HttpClient,
    private router: ActivatedRoute,
    private categoryService: CategoryService,
    private centerService: CenterService
  ) {
    this.loading = false;
    this.messageText = "";
  }

  ngOnInit() {
    this.initializeMap();
    this.router.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.centerService.getById(id).subscribe(
          (response:any) => {
            if (response.result) {
              this.thiscenter = response.result;
              this.addform = false;
            }
          }
        );
      }
    });
    this.categoryService.getAll().subscribe(
      (response:any) => {
        if (response.result) {
          this.categorys = response.result as Category[];
        }
      }
    );
  }

  submitForm() {
    this.loading = true;
    if(this.addform){
      this.centerService.add(this.thiscenter,this.selectedFile).subscribe(
        (response:any) => {
          this.loading = false;
          if(response && response.error){
            this.messageIsError  = true;
            this.messageIsUnread  = false;
            this.messageText = response.error;
          }else{
            this.messageIsUnread  = true;
            this.messageIsError  = false;
            this.messageText = "Add Center successfully";
          }

        }
      )
    }else{
      this.centerService.update(this.thiscenter,this.selectedFile).subscribe(
        (response:any) => {
          this.loading = false;
          if(response && response.error){
            this.messageIsError  = true;
            this.messageIsUnread  = false;
            this.messageText = response.error;
          }else{
            this.messageIsUnread  = true;
            this.messageIsError  = false;
            this.messageText = "Update Center successfully";
          }

        }
      )
    }

  }

  onFileSelected(event: any) {
    // Gérer la sélection d'un fichier
    this.selectedFile = event.target.files;
    console.log(this.selectedFile); // Afficher le fichier sélectionné dans la console (à adapter selon vos besoins)
    // Vous pouvez envoyer le fichier au serveur ici ou effectuer d'autres actions nécessaires
  }

  initializeMap() {
    const map = L.map('map').setView([36.85329514812128 , 10.20709812641144], 13); // Set the initial center and zoom level

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
    var marker = L.marker([36.85329514812128 , 10.20709812641144], { icon: greenIcon }).addTo(map).bindPopup('Center').openPopup();

    map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        marker.remove();
        this.getAddress(lat, lng).subscribe((data: any) => {
          const address = data.display_name;
          console.log('Address:', address);
          console.log('Latitude:', lat);
          console.log('Longitude:', lng);
          this.thiscenter.longitude = lng.toString();
          this.thiscenter.altitude = lat.toString();
          this.thiscenter.location = address;
          marker = L.marker([lat , lng], { icon: greenIcon }).addTo(map).bindPopup('Center').openPopup();
        });

      });
  }

  getAddress(lat: number, lng: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    return this.http.get(url);
  }
}
