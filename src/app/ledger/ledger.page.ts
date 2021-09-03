import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DateFilterPage } from '../date-filter/date-filter.page';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.page.html',
  styleUrls: ['./ledger.page.scss'],
})
export class LedgerPage implements OnInit {
  displayedColumns = ['Date', 'Slip No', 'Game', 'Status', 'AP'];
  dataSource = [
    {
        "date": "Will Smith",
        "slip": "Male",
        "game": "USA",
        "status":"status",
        "ap":"ap"
    },
    {
      "date": "Will Smith",
      "slip": "Male",
      "game": "USA",
      "status":"status",
      "ap":"ap"
  },
  {
    "date": "Will Smith",
    "slip": "Male",
    "game": "USA",
    "status":"status",
    "ap":"ap"
},
{
  "date": "Will Smith",
  "slip": "Male",
  "game": "USA",
  "status":"status",
  "ap":"ap"
}
];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: DateFilterPage,
      cssClass: 'update-result-modal',
      backdropDismiss: true
    });
    return await modal.present();
  }

}
