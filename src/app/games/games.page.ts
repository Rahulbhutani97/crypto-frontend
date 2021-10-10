import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LoaderAlertService } from '../services/loader-alert.service';
import { ToastController } from '@ionic/angular';

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

  constructor(
    private http:HttpService,
    private loader:LoaderAlertService,
    public toastController: ToastController) {
    this.getGame();
  }

  ngOnInit() {
  }

  getGame(){
    this.loader.presentLoading('Please wait...');
    this.http.getRequest('/api/games?active=1&date='+(new Date(this.currentDate)).toISOString(),true)
    .subscribe((response:responseData)=>{
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

  dateChange(time){
    console.log(time);
    this.currentDate = time;
    this.getGame();
  }

  toastOpen(){
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Game is closed for today',
      duration: 3000
    });
    toast.present();
  }

}
