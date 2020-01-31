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
  body: any = {};
  id: any;

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
    this.ecolService.login(this.model.pass, this.letterid).subscribe(data => {
      if (data && data[0]) {
        this.downloadFile(this.src,'co-op demand letter')
        // update as downloaded
        this.id = data[0].ID;
        this.body = {
          accnumber: data[0].ACCNUMBER,
          custnumber: data[0].CUSTNUMBER,
          nationid: data[0].NATIONID,
          letterid: data[0].LETTERID,
          phonenumber: data[0].PHONENUMBER,
          owner: data[0].OWNER,
          postdate: data[0].POSTDATE,
          isdownloaded: 'y',
          downloaddate: new Date()
        }

      } else {
        this.error = 'Incorrect login details';
      }
    })
  }

  downloadFile(filepath, filename) {
    this.ecolService.demanddownload(filepath).subscribe(data => {
      saveAs(data, filename);
      alert('Download complete!')
      this.ecolService.extletters(this.id, this.body).subscribe(resp => {
        console.log(resp)
      })
    }, error => {
      console.log(error);
      this.error = 'No letter found';
    });
  } 

}
