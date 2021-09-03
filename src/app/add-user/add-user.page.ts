import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { HttpService } from '../services/http.service';

interface responseData{
  status:string,
  data:string
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  addUserForm = new FormGroup({
    name: new FormControl('',Validators.required),
    mobile: new FormControl('',[Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
    commission: new FormControl(''),
    share: new FormControl(''),
    user_type: new FormControl('2'),
  });
  
  errors;

  constructor(private authService: AuthenticationService,
    private http:HttpService,
    public loadingController: LoadingController,
    private router: Router,
    public navCtrl: NavController,) { }

  ngOnInit() {
  }

  get name(): any {
    return this.addUserForm.get('name');
  }

  get mobile(): any {
    console.log(this.addUserForm);
    return this.addUserForm.get('mobile');
  }

  addUser(): void{
    this.presentLoading('Please wait...');
    //console.log(this.loginForm.value);
    this.http.postRequest('/api/add-user',this.addUserForm.value,true).subscribe((response:responseData)=>{
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
