import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from '../../../model/offer';
import { OfferService } from '../../../services/admin/offer/offer.service';
import { CenterService } from '../../../services/admin/center/center.service';

import { HttpClient } from '@angular/common/http';
import { Center } from 'src/app/model/center';

@Component({
  selector: 'app-form-offer',
  templateUrl: './form-offer.component.html',
  styleUrls: ['./form-offer.component.scss']
})
export class FormOfferComponent implements OnInit {
  public selectedFile: File | null = null;
  public loading: boolean;
  offer: Offer;
  action: string;
  public thisoffer: Offer = new Offer();
  public centers: Center[] = [];

  constructor(
    private centerService: CenterService,
    private offerService: OfferService,
    private route: Router,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.centerService.getAll().subscribe(
      (response:any) => {
        if (response.result) {
          this.centers = response.result;
          console.log(this.centers);
        }
      }
    );

    let id = this.router.snapshot.params['id'];
    this.offer = new Offer();
    this.action = 'Ajouter';
    console.log(id);
    if (id != null) {
      this.action = 'Modifier';
      this.offerService.searsh(id).subscribe((response: Offer) => {
        this.offer = response;
      });
    }


  }

  formatDate(date: string | null): string | null {
    if (!date) {
      return null;
    }
    const isoDate = new Date(date).toISOString().split('T')[0];
    return isoDate;
  }

  save() {
    if (this.action == 'Ajouter') {
      if (this.selectedFile) {
        this.offer.image = this.selectedFile;
      }
      console.log(this.offer);
      this.offerService.add(this.offer).subscribe(() => {
        this.route.navigate(['admin/offer/lister']);
      });
    } else if (this.action == 'Modifier') {
       if (this.selectedFile) {
        this.offer.image = this.selectedFile;
      }
      this.offerService.update(this.offer).subscribe(() => {
        this.route.navigate(['admin/offer/lister']);
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
