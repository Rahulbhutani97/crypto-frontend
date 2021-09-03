import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private router:Router,
    private authService: AuthenticationService,
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
	  
      this.authService.authenticationState.subscribe(state => {
        console.log(state);
        if (state) {
          //this.router.navigate(['home']);
        }else if(state===false){
          //this.router.navigateByUrl('/login');
        }
      });
    });
  }
}
