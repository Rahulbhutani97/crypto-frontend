import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  currentTime = (new Date()).toISOString();
  addGameForm = new FormGroup({
    name: new FormControl(''),
    short_name: new FormControl(''),
    result_time: new FormControl(this.currentTime)
    //active_status: new FormControl()
  });

  errors;
  updateStatus = false;
  game_id:any;

  constructor(private authService: AuthenticationService,
    private http:HttpService,
    public loadingController: LoadingController,
    private router: Router,
    public navCtrl: NavController,
    private route:ActivatedRoute) {
      this.route.queryParams.subscribe(param => {
        if(param.id){
          this.addGameForm.patchValue({
            name: param.name,
            short_name: param.short_name,
            result_time: param.result_time
            //active_status: param.active_status,
            //id: param.id
          });

          this.addGameForm.addControl('active_status', new FormControl(param.active_status));
          this.addGameForm.addControl('id', new FormControl(param.id));

          this.game_id = param.id;
          this.updateStatus = true;
        }
      })
    }

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

  updateGame(){
    this.presentLoading('Please wait...');
    //console.log(this.loginForm.value);
    this.http.putRequest('/api/games/'+this.game_id,this.addGameForm.value,true).subscribe((response:responseData)=>{
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

  deleteGame(){

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
