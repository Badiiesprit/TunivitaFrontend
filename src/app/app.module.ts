import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { IconSetModule } from '@coreui/icons-angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { DataTablesModule } from "angular-datatables";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule  } from 'ngx-filter-pipe';
import { ForgotPasswordComponent } from './services/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './services/reset-password/reset-password.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';
import { DefaultFooterCxComponent, DefaultHeaderCxComponent, DefaultLayoutCxComponent } from './containers-cx';
import { FormsModule } from '@angular/forms';





import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,

} from '@coreui/angular';
import { ListServiceCxComponent } from './client/service/list-service-cx/list-service-cx.component';
import { HomeComponent } from './client/home/home.component';
import { FormPostComponent } from './admin/post/form-post/form-post.component';
import { ListPostComponent } from './admin/post/list-post/list-post.component';
import { ListCommentComponent } from './admin/comment/list-comment/list-comment.component';



const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
  DefaultLayoutCxComponent,
  DefaultHeaderCxComponent,
  DefaultFooterCxComponent

];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, HomeComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    MatSlideToggleModule,
    DataTablesModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    IconSetModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    FormsModule,
    UtilitiesModule,
    ButtonGroupModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
