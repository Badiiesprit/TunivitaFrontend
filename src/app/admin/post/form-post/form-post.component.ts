import { PostService } from 'src/app/services/admin/post/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.scss']
})
export class FormPostComponent {
  public selectedFile: File | null = null;
  public loading: boolean;
  post: Post;
  action: string;

  constructor(
    private postService: PostService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['id']);
    let id = this.activatedRoute.snapshot.params['id'];

    this.post = new Post();
    this.action = 'Ajouter';
    console.log(id);
    if (id != null) {
      this.action = 'Modifier';
      this.postService.searsh(id).subscribe((response: Post) => {
        this.post = response;
      });
    }
  }


  save() {
    if (this.action == 'Ajouter') {
      if (this.selectedFile) {
        this.post.image = this.selectedFile;
      }
      console.log(this.post);
      this.postService.add(this.post).subscribe(() => {
        this.route.navigate(['post/lister']);
      });
    } else if (this.action == 'Modifier') {
      this.postService.update(this.post).subscribe(() => {
        this.route.navigate(['post/lister']);
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
