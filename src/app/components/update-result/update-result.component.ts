import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { LoaderAlertService } from 'src/app/services/loader-alert.service';

interface responseData{
  status:string,
  data:any
}

@Component({
  selector: 'app-update-result',
  templateUrl: './update-result.component.html',
  styleUrls: ['./update-result.component.scss'],
})
export class UpdateResultComponent implements OnInit {

  errors;
  games = [];
  message;
  result;

  constructor(public modalController: ModalController,private http:HttpService,
    private loader:LoaderAlertService) {
      this.getGame();
    }

  ngOnInit() {}

  getGame(){
    this.loader.presentLoading('Please wait...');
    this.http.getRequest('/api/games?active=1',true)
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

  save(gameId, resultNumber){
    if(gameId && resultNumber){
      console.log(gameId, resultNumber);

        this.loader.presentLoading('Please wait...');
         let postData = {
           game_id: gameId,
           result:resultNumber
         };
        this.http.postRequest('/api/result', postData, true)
        .subscribe((response:responseData)=>{
          this.loader.loadingDismiss();

          if(response.status=='success'){
            this.message = response.data;
            alert('Saved successfully');
            this.getGame();
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

  gameSelected(gameId){
    //console.log(gameId);
    this.result = this.games.filter((game)=>{
      return game.id == gameId;
    }).map((game)=>{
      return game.result;
    })[0];
    //console.log(this.result);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
