import { Component } from '@angular/core';
import { Service } from '../../../model/service';
import { ServiceService } from 'src/app/services/admin/service/service.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Image } from 'src/app/model/image';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {
  public service:Service;
  public baseurl = environment.url;
  public image:Image = new Image();


  constructor(private route:ActivatedRoute ,private serviceService: ServiceService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.serviceService.searsh(id).subscribe(
          (response) => {
            if (response) {
              this.service = response;
              this.image = this.service.image as Image;
              console.log(this.image.path);
            }
          }
        );
      }





    });}
}
