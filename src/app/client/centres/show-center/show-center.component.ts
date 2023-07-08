import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { CategoryService } from 'src/app/services/admin/category/category.service';
import { CenterService } from 'src/app/services/client/center/center.service';

@Component({
  selector: 'app-show-center',
  templateUrl: './show-center.component.html',
  styleUrls: ['./show-center.component.scss']
})
export class ShowCenterComponent {
public thiscenter: any;
public baseurl = environment.url;
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
            }
          }
        );
      }
    });
  }
}
