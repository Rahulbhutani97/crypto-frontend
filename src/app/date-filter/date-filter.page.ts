import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.page.html',
  styleUrls: ['./date-filter.page.scss'],
})
export class DateFilterPage implements OnInit {
  currentDate = Date();
  
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
