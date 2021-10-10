import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.page.html',
  styleUrls: ['./date-filter.page.scss'],
})
export class DateFilterPage implements OnInit {
  fromDate:any = new Date();
  toDate:any = new Date();
  button = 'close';

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  filter(fromDate, toDate){
    console.log(fromDate);
    this.fromDate = (new Date(fromDate)).toISOString();
    this.toDate = (new Date(toDate)).toISOString();
    this.button = 'filter';
    this.dismiss();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      'button': this.button,
      'from': this.fromDate,
      'to': this.toDate
    });
  }

}
