import { Injectable } from '@angular/core';
import { Platform,NavController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage  } from '@ionic/storage-angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(null);
 
  constructor(private storage: Storage,
  private plt: Platform,
  public navCtrl: NavController,) {
    this.storage.create();
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }else{
		    this.authenticationState.next(false); 
	    }
    })
  }

  async getToken(){
    return await this.storage.get(TOKEN_KEY);
  }
 
  login(data){
    return this.storage.set(TOKEN_KEY, data.token).then(() => {
      this.authenticationState.next(true);
	    localStorage.setItem("USER_PROFILE", JSON.stringify(data));
    });
  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
	    localStorage.removeItem("USER_PROFILE");
    });
  }
 
  isAuthenticated(): Observable<boolean> {
    return this.authenticationState.value;
  }

}
