import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public baseUrl = environment.url;
  public newNotifications = new Array(5)
  public infouser:any;
  constructor(
    private classToggler: ClassToggleService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    super();
    const token = localStorage.getItem('token');
    if(token && token!=""){
      // Get the role from the token using jwt-decode library
      const decodedToken: any = jwt_decode(token);
      this.infouser = decodedToken;
      if (!decodedToken.role.includes('admin')) {
        this.router.navigate(['/']);
      }
      console.log(decodedToken);
    }else{
      this.router.navigate(['/login']);
    }
  }
  logout(){
    localStorage.setItem('token',"");
    this.router.navigate(['/login']);
  }
}
