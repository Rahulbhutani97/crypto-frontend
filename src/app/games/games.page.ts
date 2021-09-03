import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LoaderAlertService } from '../services/loader-alert.service';

interface responseData{
  status:string,
  data:any
}

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  
  currentDate= Date();
  games=[];

  errors;
  
  constructor(private http:HttpService,private loader:LoaderAlertService) { 
    this.getGame();
  }

  ngOnInit() {
  }

  getGame(){
    this.loader.presentLoading('Please wait...');
    this.http.getRequest('/api/games',true).subscribe((response:responseData)=>{
      this.loader.loadingDismiss();

      if(response.status=='success'){
        this.games = response.data;
      }else{
        alert('Something went wrong!');
      }
    },(error)=>{
      //console.log(error);
      this.loader.loadingDismiss();
      this.errors = error.error.errors;
    });
  }

}
