import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AjaxContentService } from '@/services/ajax-content-service';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: [
    '../../assets/css/style.css'
  ]
})
export class ContentComponent implements OnInit {
  title = 'Search content in Ajax library';

  displayedColumns: string[] = ['name'];
  dataSource: any;
  searchParam: FormControl = new FormControl('');
  returnUrl: string;
  rowData: any[] = []


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: AjaxContentService,
    public toastr: ToastrService,

  ) {

  }

  ngOnInit() {
    this.getContent();
  }

  filterByInput(event: any) {
    /** client based filter: */
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    /** server side filter */
    if (event.key === "Enter") {
      this.getContent(event.target.value);
    }

  }
  filterByButton() {
    /** server side filter */
    if (this.searchParam.value !== undefined) {
      this.getContent(this.searchParam.value);

    }
  }

  getContent(params?: string) {
    if (params) { params = '?search=' + params }
    if (!params) { params = '' } // if no seach param, then set blank // Lu

    this.searchService.getContentByFilter(params)
      .subscribe(res => {
        console.log(res);
        if (res) {
          if (res.status === 200) {
            if (res.body && res.body.total > 0) {
              console.log('table rows ', res.body.results);
              this.rowData = res.body.results;
              this.dataSource = new MatTableDataSource(this.rowData);
            } else {
              this.rowData = [];
              this.dataSource = []
              const msg = 'Content not found';
              // this.toastr.clear();
              this.toastr.info(msg, '', { timeOut: 4000 });
            }
          }
        }
      }, error => {
        console.log(error)
      });
  }
  Logout() {
    localStorage.clear();
    this.toastr.success('Logged out', '', { timeOut: 4000 });
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
