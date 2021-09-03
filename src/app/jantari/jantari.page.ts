import { Component, OnInit } from '@angular/core';
//import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-jantari',
  templateUrl: './jantari.page.html',
  styleUrls: ['./jantari.page.scss'],
})
export class JantariPage implements OnInit {
  currentDate = Date();
  constructor(
    //private screenOrientation: ScreenOrientation
    ) { }

  ngOnInit() {
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
  ngOnDestroy(){
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

}
