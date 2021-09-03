import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController  } from '@ionic/angular';
import { UpdateResultComponent } from '../components/update-result/update-result.component';
import { AuthenticationService } from '../services/authentication.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public modalController: ModalController,
    private authService:AuthenticationService,
    private router:Router,
    private alertController:AlertController,
    private http:HttpService,
    private loadingController:LoadingController
    ) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: UpdateResultComponent,
      cssClass: 'update-result-modal',
      backdropDismiss: true
    });
    return await modal.present();
  }

  logOut(){
    this.presentLoading('Logging out...');
    this.http.postRequest('/api/auth/logout','{}',true).subscribe((response)=>{
      console.log(response);
      this.loadingDismiss();
      this.authService.logout();
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 500);
    },(error)=>{
      //console.log(error);
      this.loadingDismiss();
      alert('LogOut failed! Try again');
    });
  }

  async logOutAlert() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: "LogOut Alert",
      message: 'Are you sure you want to logout?',
      mode:'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.logOut();
          }
        }
      ]
    });

    await alert.present();
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
