import { Component } from '@angular/core';
import { CenterService } from 'src/app/services/client/center/center.service';
import { Center } from 'src/app/model/center';
import { Image } from 'src/app/model/image';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-list-centres-cx',
  templateUrl: './list-centres-cx.component.html',
  styleUrls: ['./list-centres-cx.component.scss']
})
export class ListCentresCxComponent {
  public centers : Center[] = new Array(0);
  public baseurl = environment.url;
  constructor(private centerService : CenterService){}

  ngOnInit() {
    this.centerService.getAll().subscribe(
      (response) => {
        console.log(response);
        console.log(response.result);
        if (response.result) {
          this.centers = response.result.map((center: Center) => {
            let image= center.image[0] as Image;
            return {
              ...center,
              pathimage: image.path // Ajoutez ici le chemin de l'image souhaité
            };
          });
          console.log(this.centers);
        }
      }
    );
  }

  voirplus(centerId : any){

  }

}
