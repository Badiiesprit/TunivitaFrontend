import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/admin/comment/comment.service';
import { PostService } from 'src/app/services/admin/post/post.service';
import { jsPDF } from 'jspdf';
import { Comment } from 'src/app/model/comment';
import { environment } from '../../../environments/environment';


import html2canvas from 'html2canvas';


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  constructor(private service: PostService,
    private commentService: CommentService,
    private _formBuilder: FormBuilder,
    private ac: ActivatedRoute,) { }

  myParam: string;
  comments:any;
  post: any;
  formComment = new FormControl('');
  public baseurl = environment.url;


  firstFormGroup = this._formBuilder.group({
    text: ['']
  });
  ngOnInit(): void {
    this.ac.paramMap.subscribe(
      res => {
        this.myParam = String(res.get('id')),
          this.service.searsh(this.myParam).subscribe(
            res =>{ this.post = res
              this.commentService.getCommentByPost(this.myParam).subscribe(
                res => this.comments = res
              )
             }

          )
      });

  }

  onSubmit(){
    var body = {
      text: this.firstFormGroup.value.text,
      Postid: this.myParam,

    };
    this.commentService.addComment(body).subscribe(
      res =>{
        this.firstFormGroup.reset();
        this.ngOnInit();

      }
    )
  }
  like(){
    this.commentService.like(this.myParam).subscribe(
      res =>{
        this.firstFormGroup.reset();
        this.ngOnInit();

      }
    )

  }
  dislike(){
    this.commentService.dislike(this.myParam).subscribe(
      res =>{
        //this.firstFormGroup.reset();
        this.ngOnInit();

      }
    )

  }

  htmlSelection:any;

  downloadAsPDF() {
    const doc = new jsPDF();
    this.htmlSelection = document.querySelector('#myHtmlElement');

    this.htmlSelection.style.width = '50mm';
    doc.html(this.htmlSelection, {
      callback: function () {
        doc.save('download.pdf');
      }
    });
  }



  deleteComment(comment: Comment) {
    const i = this.comments.indexOf(comment);
    console.log("test");
    console.log(comment);
    console.log(comment._id);


    if (i !== -1) {
      this.commentService.delete(comment._id).subscribe(() => {
        this.comments.splice(i, 1);
      }, (error) => {
        console.error(error);
      });
    }
  }
  commentDetails:Comment;
  commentIndex:number
  showEdit(comment:Comment){
    this.showComment=true;
    this.commentIndex = this.comments.indexOf(comment);

    this.commentDetails=comment
  }
  showComment:boolean;
  updateComment(comment:any){
    const i = this.comments.indexOf(comment);


      var body = {
        _id: this.commentDetails._id,
        text:this.formComment.value,

      };


    this.commentService.update(body).subscribe(() => {
      this.showComment=false;
      this.commentIndex=-1
      this.ngOnInit();

    });
  }
}
