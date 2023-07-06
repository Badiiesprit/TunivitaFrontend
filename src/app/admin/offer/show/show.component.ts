import { Component } from '@angular/core';
import { Offer } from '../../../model/offer';
import { OfferService } from 'src/app/services/admin/offer/offer.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Image } from 'src/app/model/image';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {
  public offer :Offer;
  public baseurl = environment.url;
  public image:Image = new Image();


  constructor(private route:ActivatedRoute ,private offerService: OfferService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.offerService.searsh(id).subscribe(
          (response) => {
            if (response) {
              this.offer = response;
              this.image = this.offer.image as Image;
              console.log(this.image.path);
            }
          }
        );
      }
    });}
}
