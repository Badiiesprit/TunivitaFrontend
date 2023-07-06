import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/admin/post/post.service';
import { HttpClient } from '@angular/common/http';
import { ImageService } from 'src/app/services/admin/image/image.service';
import { Image } from 'src/app/model/image';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent {
  list:any[] = [];
  motcle:string;
  totalPages: number = 0;
  currentPage: number = 1;
  searchName: string = '';
  searchDescription: string = '';
  searchLocation: string = '';
  searchDate: string = '';

  sortField: string = '';
  sortOrder: string = '';

  selectedPost: Post | null = null;
  showDetails:Boolean;
  public image:Image = new Image();
  public imageUrl: string;
  public baseurl = environment.url;
  startDate: string;
  endDate: string;
  statistics: any[];

constructor(
  private postService: PostService,
  private route: Router,
  private activatedRoute: ActivatedRoute,
  private http: HttpClient,
  private imageService: ImageService,
) {}



  ngOnInit() {
    this.postService.getAll().subscribe(
      (response) => {
        this.list = response;
        $(document).ready(function() {
          $('#myTable').DataTable({
            columnDefs: [{
              targets: 'no-sort',
              orderable: false
            }]
          });
        });
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
    // this.getServicesPage(this.currentPage);
  }


  showServiceDetails(post: Post) {
    this.selectedPost = post;
    this.showDetails = true;
    console.log(post.image);

    this.imageService.searsh(post.image as string).subscribe((response: Image) => {
      console.log("Response", response);
      this.imageUrl=response.path;
      console.log(response.path);
    });
    console.log(this.imageUrl);
    const url="127.0.0.1:5050/"+this.imageUrl;
    console.log(url);
  }







  hideServiceDetails() {
    this.selectedPost = null;
  }


  deleteService(post: Post) {
    const i = this.list.indexOf(post);
    console.log("test");
    console.log(post);
    console.log(post._id);


    if (i !== -1) {
      this.postService.delete(post._id).subscribe(() => {
        this.list.splice(i, 1);
      }, (error) => {
        console.error(error);
      });
    }
  }


  toggleService(post: Post) {
    console.log(post._id);
    this.http.get("http://localhost:5050/services/enable-disable/"+post._id).subscribe((response: any) => {
      if (response.disable !== undefined) {
        post.disable = response.disable;
      }
    });
  }

}
