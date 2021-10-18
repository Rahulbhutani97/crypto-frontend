import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../services/http.service';
import { LoaderAlertService } from '../services/loader-alert.service';
import { AlertController, LoadingController } from '@ionic/angular';

interface responseData{
  status:string,
  data:any
}

@Component({
  selector: 'app-my-game',
  templateUrl: './my-game.page.html',
  styleUrls: ['./my-game.page.scss'],
})
export class MyGamePage implements OnInit {
  errors;
  games = [];

  constructor(public modalController: ModalController,private http:HttpService,
    private loader:LoaderAlertService,
    public alertController: AlertController,
    private loadingController: LoadingController) {
      this.getGame();
    }

  ngOnInit() {
  }

  getGame(){
    this.loader.presentLoading('Please wait...');
    this.http.getRequest('/api/games',true)
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

  delete(id){
    this.loader.presentLoading('Please wait...');
    this.http.deleteRequest('/api/games/'+id,true)
    .subscribe((response:responseData)=>{
      this.loader.loadingDismiss();

      if(response.status){
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

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm Delete!',
      message: 'Do you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.delete(id);
          }
        }
      ]
    });

    await alert.present();
  }

}
