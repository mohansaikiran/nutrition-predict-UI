import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient) { }

  data : any;
  openCam = false;
  addedFiles: Array<any> = [];

  ngOnInit() {
  }

  sendPostRequest(data: any): Observable<any> {
    return this.httpClient.post<any>("URL", data);
}

  loadFile(event) {
    console.log(event.target.files);
    const files = Array.prototype.slice.call(event.target.files);
    try {
      files.forEach((file) => {
        this.addedFiles.unshift({
          url: window.URL.createObjectURL(file),
          file: file,
        });
      });
    } catch(e) {
      console.log("Error: " + e);
    }
    this.sendPostRequest(this.addedFiles).subscribe((res)=> {
      console.log(res);
    });
  }

  logout() {
    this.router.navigate(["login"]);
  }

}
