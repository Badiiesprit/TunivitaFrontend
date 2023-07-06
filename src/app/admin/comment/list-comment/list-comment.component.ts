import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/model/comment';
import { CommentService } from 'src/app/services/admin/comment/comment.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent {
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
  selectedComment: Comment | null = null;

  showDetails:Boolean;
  public imageUrl: string;
  public baseurl = environment.url;
  startDate: string;
  endDate: string;
  statistics: any[];

constructor(
  private commentService: CommentService,
  private route: Router,
  private activatedRoute: ActivatedRoute,
  private http: HttpClient,
) {}



  ngOnInit() {
    this.commentService.getAll().subscribe(
      (response) => {
        this.list = response.comments;
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


  showServiceDetails(comment: Comment) {
    this.selectedComment = comment;
    this.showDetails = true;
  }







  hideServiceDetails() {
    this.selectedComment = null;
  }


  deleteService(post: Comment) {
    const i = this.list.indexOf(post);
    console.log("test");
    console.log(post);
    console.log(post._id);


    if (i !== -1) {
      this.commentService.delete(post._id).subscribe(() => {
        this.list.splice(i, 1);
      }, (error) => {
        console.error(error);
      });
    }
  }


  toggleService(post: Comment) {
    console.log(post._id);
    this.http.get("http://localhost:5050/services/enable-disable/"+post._id).subscribe((response: any) => {
      if (response.disable !== undefined) {
        post.disable = response.disable;
      }
    });
  }

}
