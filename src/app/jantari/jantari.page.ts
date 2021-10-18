import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../services/http.service';
import { LoaderAlertService } from '../services/loader-alert.service';
//import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

interface responseData{
  status:string,
  data:any,
  andar:any,
  bahar:any,
  subtotal:any,
  total:any
}

@Component({
  selector: 'app-jantari',
  templateUrl: './jantari.page.html',
  styleUrls: ['./jantari.page.scss'],
})
export class JantariPage implements OnInit {
  currentDate = (new Date()).toISOString();
  errors;
  games = [];
  gameName:any;
  jantari:any=[];
  andar:any=[];
  bahar:any=[];
  subtotal:any=[];
  total:any=0;
  counter = 0;
  JantariData:any;

  constructor(
    //private screenOrientation: ScreenOrientation,
    public modalController: ModalController,
    private http:HttpService,
    private loader:LoaderAlertService
    ) {
      this.getGame();
    }

  ngOnInit() {
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
  ngOnDestroy(){
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

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

  getJantari(){
    let postData = {
      date: this.currentDate,
      game_id: this.gameName
    }
    this.loader.presentLoading('Please wait...');
    this.http.postRequest('/api/get-jantari',postData, true)
    .subscribe((response:responseData)=>{
      this.loader.loadingDismiss();

      if(response.status){
        this.JantariData = response;
        this.jantari = response.data;
        this.andar = response.andar;
        this.bahar = response.bahar;
        this.subtotal = response.subtotal;
        this.total = response.total;
      }else{
        alert('Something went wrong!');
      }
    },(error)=>{
      //console.log(error);
      this.loader.loadingDismiss();
      this.errors = error.error.errors;
    });
  }

  mapNumber(num){
    let number = this.jantari.filter(n=>{
      return n.number == num;
    }).map(n => {
      return n.total;
    })

    if(number>0){
      return number;
    }else{
      return 0;
    }
  }

  mapAndar(num){
    let number = this.andar.filter(n=>{
      return n.number == num;
    }).map(n => {
      return n.total;
    })

    if(number>0){
      return number;
    }else{
      return 0;
    }
  }

  mapBahar(num){
    let number = this.bahar.filter(n=>{
      return n.number == num;
    }).map(n => {
      return n.total;
    })

    if(number>0){
      return number;
    }else{
      return 0;
    }
  }

  mapSubtotal(num){
    let number = this.subtotal.filter(n=>{
      return n.number == num;
    }).map(n => {
      return n.total;
    })

    if(number>0){
      return number;
    }else{
      return 0;
    }
  }

  mapSubtotalAndar(){
    const number = this.andar.reduce((sum, current) => Number(sum) + Number(current.total), 0);

    if(number>0){
      return number;
    }else{
      return 0;
    }
  }

  mapSubtotalBahar(){
    const number = this.bahar.reduce((sum, current) => Number(sum) + Number(current.total), 0);

    if(number>0){
      return number;
    }else{
      return 0;
    }
  }

}
