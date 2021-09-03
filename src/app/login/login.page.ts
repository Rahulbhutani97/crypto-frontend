import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

interface responseData{
  status:string,
  message:string,
  data:{
    token:string,
    email:string,
    id:number,
    name:string
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  loginForm = new FormGroup({
    email: new FormControl('amitbkumar@gmail.com'),
    password: new FormControl('12345678'),
  });

  errors:any;

  constructor(
    private authService: AuthenticationService,
    private http:HttpService,
    public loadingController: LoadingController,
    private router: Router,
    public navCtrl: NavController,) { }

  ngOnInit() {
  }

  login(){
    this.presentLoading('Please wait...');
    //console.log(this.loginForm.value);
    this.http.postRequest('/api/auth/login',this.loginForm.value).subscribe((response:responseData)=>{
      console.log(response);
      this.loadingDismiss();

      if(response.status=='Success'){
        this.authService.login(response.data);
        setTimeout(() => {
          this.http.authKeyChange.next();
          this.router.navigate(['home']);
        }, 500);
        
        //this.navCtrl.navigateRoot('/home');
        
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
