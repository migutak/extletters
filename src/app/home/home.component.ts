import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../app/ecol.service';
import { saveAs } from 'file-saver';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  error = '';
  model: any = {};
  // src = environment.filepath + "0110001304260024-Aug-2019demand1.pdf";
  src: string;
  myVar = false;
  letterid: string;

  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private ecolService: EcolService) {
  }

  ngOnInit() {
    this.myVar = false;
    this.letterid = this.activatedRoute.snapshot.params.letterid;
    this.src = environment.filepath + this.letterid;
  }

  login() {
    this.error = '';
    if(this.model.pass === '123456') {
      this.downloadFile(this.src,'co-op demand letter')
    } else {
      this.error = 'Wrong nation id';
    }
  }

  downloadFile(filepath, filename) {
    this.ecolService.demanddownload(filepath).subscribe(data => {
      saveAs(data, filename);
      alert('Download complete!')
    }, error => {
      console.log(error.error);
    });
  } 

}
