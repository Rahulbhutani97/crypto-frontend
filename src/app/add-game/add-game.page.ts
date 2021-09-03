import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { HttpService } from '../services/http.service';

interface responseData{
  status:string,
  data:string
}

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.page.html',
  styleUrls: ['./add-game.page.scss'],
})
export class AddGamePage implements OnInit {

  addGameForm = new FormGroup({
    name: new FormControl(''),
    short_name: new FormControl(''),
    result_time: new FormControl('05:00'),
  });
  
  errors;

  constructor(private authService: AuthenticationService,
    private http:HttpService,
    public loadingController: LoadingController,
    private router: Router,
    public navCtrl: NavController,) { }

  ngOnInit() {
  }

  addGame(){
    this.presentLoading('Please wait...');
    //console.log(this.loginForm.value);
    this.http.postRequest('/api/games',this.addGameForm.value,true).subscribe((response:responseData)=>{
      console.log(response);
      this.loadingDismiss();

      if(response.status=='success'){
        alert('Saved successfully');
      }else{
        alert('Something went wrong!');
      }
    },(error)=>{
      //console.log(error);
      this.loadingDismiss();
      this.errors = error.error.errors;
    });
  }

  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      cssClass: 'loading-css',
      message: msg,
      spinner: 'crescent',
      mode:'ios'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  async loadingDismiss() {
    this.loadingController.dismiss().then(() => console.log('loading dismissed'));
  }
}
