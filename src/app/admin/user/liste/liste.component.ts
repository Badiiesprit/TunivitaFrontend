import { Component, OnInit,ElementRef } from '@angular/core';
import { UserService } from '../../../services/admin/user/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';
import { User } from 'src/app/model/user';
import { HttpClient } from '@angular/common/http';
import Chart, { ChartType } from 'chart.js/auto';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {

  users: any[] = [];
  token: string;
  selectedUser:any;
  user:User;

  myChart:any;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.userService.get().subscribe(
      (response) => {
        this.users = response;
        $(document).ready(function() {
          $('#myTable').DataTable({
            columnDefs: [{
              targets: 'no-sort',
              orderable: false
            }]
          });
        });
        console.log(this.users);

      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );

    this.userService.getStatistics().subscribe((data) => {
      console.log(data);
      this.createChart(data);
    });
  }

  createChart(data: any): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Nomnre d\'hommes inscrits', 'Nomnre de Femmes inscrites'],
        datasets: [
          {
            label: 'Offer Status',
            data: [data.countHommes, data.countFemmes],
            backgroundColor: [ '#004AAD', ' #BDD1F9'],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                if (context.dataset) {
                  const dataPoint = context.dataset.data[context.dataIndex] || 0;
                  const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                  const percentage = Math.round((dataPoint / total) * 100);
                  return `${label}: ${dataPoint} (${percentage}%)`;
                }
                return '';
              }
            },
            bodyFont: {
              size: 14 // Adjust the font size of the tooltip body as per your needs
            }
          },
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 18 // Adjust the font size of the legend labels
              }
            }
          }
        }
      }
    });
  }


    disableUser(user: any) {
      this.userService.disableUser(user._id).subscribe(
        () => {
          console.log('User disabled successfully');
        },
        (error) => {
          console.error('Error disabling user:', error);
        }
      );
    }


    updateUser(user: any) {
      this.router.navigate(['update', user._id]);
    }


    toggleService(user: User) {
      console.log(user._id);
      this.userService.disableUser(user._id).subscribe((response: any) => {
        if (response.disable !== undefined) {
          user.disable = response.disable;
        }
      });
    }

    userModal() {
      this.router.navigate(['userModal']);
    }

    getUserInfo(userId: string) {
      this.userService.getById(userId).subscribe(
        (response) => {
          if (response.result) {
            this.user = response.result;
            console.log(response);
            alert(`firstname: ${response.result.firstname}\nLastname: ${response.result.Lastname}\nEmail: ${response.result.email}\nGender: ${response.result.gender}`);
          }
        }
      );
    }

}
