import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/model/service';
import { ServiceService } from 'src/app/services/admin/service/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-service',
  templateUrl: './form-service.component.html',
  styleUrls: ['./form-service.component.scss']
})
export class FormServiceComponent implements OnInit {
  public selectedFile: File | null = null;
  public loading: boolean;
  service: Service;
  action: string;

  constructor(
    private serviceService: ServiceService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['id']);
    let id = this.activatedRoute.snapshot.params['id'];

    this.service = new Service();
    this.action = 'Ajouter';
    console.log(id);
    if (id != null) {
      this.action = 'Modifier';
      this.serviceService.searsh(id).subscribe((response: Service) => {
        console.log('Fetched date:', response.date);
        this.service = response;
        this.service.date = this.formatDate(response.date); // Format the date
        console.log('Formatted date:', this.service.date);
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
        this.service.image = this.selectedFile;
      }
      console.log(this.service);
      this.serviceService.add(this.service).subscribe(() => {
        this.route.navigate(['service/lister']);
      });
    } else if (this.action == 'Modifier') {
      this.serviceService.update(this.service).subscribe(() => {
        this.route.navigate(['service/lister']);
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
