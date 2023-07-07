import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ImageService } from 'src/app/services/admin/image/image.service';
import { PostService } from 'src/app/services/admin/post/post.service';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.scss']
})
export class ListBlogsComponent implements OnInit {
  constructor(private postService: PostService,
    private http: HttpClient,
    private imageService: ImageService){}


    blogs: any[] = [];
  public motcle: string;
  public baseurl = environment.url;
  filteredBlogs: any[] = [];
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 8; // Number of items to display per page
  sortOrder: string = 'asc'; // Sort order for date sorting
  sort_direction:string= "up";

  ngOnInit(): void {

    this.postService.getAll().subscribe(
      (response) => {
        this.blogs = response;
        this.filteredBlogs = this.blogs;
        console.log(this.blogs);
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
    
  }

  search(): void {
    if (this.motcle) {
      this.filteredBlogs = this.blogs.filter(service =>
        service.title.toLowerCase().includes(this.motcle.toLowerCase()) ||
        service.description.toLowerCase().includes(this.motcle.toLowerCase()) ||
        service.short_description.toLowerCase().includes(this.motcle.toLowerCase())
      );
    } else {
      this.filteredBlogs = this.blogs;
    }
    this.currentPage = 1; // Reset current page to 1 after search
  }

  get totalPages(): number {
    return Math.ceil(this.filteredBlogs.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }




  sortServicesByDate(): void {
    let arrayToSort = this.blogs;

    if (this.motcle) {
      arrayToSort = this.filteredBlogs;
    }

    arrayToSort.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (this.sortOrder === 'asc') {
        this.sort_direction = "up";
        return dateA - dateB;
      } else {
        this.sort_direction = "down";
        return dateB - dateA;
      }
    });
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  getSortIconClass(): string {
    return this.sortOrder === 'asc' ? 'asc' : 'desc';
  }

  

}
