import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DateFilterPage } from '../date-filter/date-filter.page';
import { HttpService } from '../services/http.service';
import { LoaderAlertService } from '../services/loader-alert.service';

interface responseData{
  status:string,
  data:any
}

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.page.html',
  styleUrls: ['./ledger.page.scss'],
})
export class LedgerPage implements OnInit {
  displayedColumns = ['User','Date', 'Slip No', 'Game', 'Status', 'AP'];
  dataSource = [];
  search:any;
  fromDate:any;
  toDate:any;

errors;

  constructor(public modalController: ModalController,
    private http:HttpService,private loader:LoaderAlertService) {
      this.getLedger()
    }

  ngOnInit() {
  }

  getLedger(){
    this.loader.presentLoading('Please wait...');
    this.http.getRequest('/api/ledger',true).subscribe((response:responseData)=>{
      this.loader.loadingDismiss();

      if(response.status=='success'){
        this.dataSource = response.data;
      }else{
        alert('Something went wrong!');
      }
    },(error)=>{
      //console.log(error);
      this.loader.loadingDismiss();
      this.dataSource = error.error.errors;
    });
  }

  searchLedger(){
    this.loader.presentLoading('Please wait...');
    let postData = {
      search: this.search,
      from_date: this.fromDate,
      to_date: this.toDate
    }
    this.http.postRequest('/api/ledger', postData, true).subscribe((response:responseData)=>{
      this.loader.loadingDismiss();

      if(response.status=='success'){
        this.dataSource = response.data;
      }else{
        alert('Something went wrong!');
      }
    },(error)=>{
      //console.log(error);
      this.loader.loadingDismiss();
      this.dataSource = error.error.errors;
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: DateFilterPage,
      cssClass: 'update-result-modal',
      backdropDismiss: true
    });

    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        console.log(modelData.data);
        if(modelData.data.button == 'filter'){
          this.fromDate = modelData.data.from;
          this.toDate = modelData.data.to;
          this.searchLedger();
        }
      }
    });

    return await modal.present();
  }

}
