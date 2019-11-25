import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EcolService } from '../app/ecol.service';
import { saveAs } from 'file-saver';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  error = '';
  model: any = {};
  src = environment.filepath + "0110001304260024-Aug-2019demand1.pdf";
  myVar = false;
  

  constructor(private http: HttpClient,
    private ecolService: EcolService) {
  }

  ngOnInit() {
    this.myVar = false;
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
