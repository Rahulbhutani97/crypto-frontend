import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-result',
  templateUrl: './update-result.component.html',
  styleUrls: ['./update-result.component.scss'],
})
export class UpdateResultComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
