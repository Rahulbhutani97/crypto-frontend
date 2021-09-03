import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ReplaySubject, Subject } from 'rxjs';
import {debounceTime, delay, tap, filter, map, takeUntil} from 'rxjs/operators';
import { HttpService } from '../services/http.service';

export interface User {
  id: string;
  name: string;
  mobile:number;
}

interface Response{
  status:string;
  data:any;
  message:string;
}


@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.page.html',
  styleUrls: ['./game-form.page.scss'],
})
export class GameFormPage implements OnInit {
  gametype='cutting';
  joditype='jodi';
  harupType='andar';
  cuttingSet:any=[];
  cuttingSetToshow:any
  cuttingInput:any;
  selectedJodi:any;
  selectedHarup:any;
  formatedJodi=[];
  finalSelectedCrossing:any;
  formatedHarup = [];
  finalSelectedHarup:any;
  formatedTo = [];
  finalSelectedTo:any;
  fixChangeType='';

  enterAmount:number=null;
  message:any;
  total:number;

  fromNumber:number = null;
  toNumber:number = null;
  checkboxArray = [];
  timeout;
  searchResult:any;
  game_id:any;
  order_id:any;

  public jodi = [
    { val: 0, isChecked: false },
    { val: 1, isChecked: false },
    { val: 2, isChecked: false },
    { val: 3, isChecked: false },
    { val: 4, isChecked: false },
    { val: 5, isChecked: false },
    { val: 6, isChecked: false },
    { val: 7, isChecked: false },
    { val: 8, isChecked: false },
    { val: 9, isChecked: false }
  ];

  public withoutjodi = [
    { val: 0, isChecked: false },
    { val: 1, isChecked: false },
    { val: 2, isChecked: false },
    { val: 3, isChecked: false },
    { val: 4, isChecked: false },
    { val: 5, isChecked: false },
    { val: 6, isChecked: false },
    { val: 7, isChecked: false },
    { val: 8, isChecked: false },
    { val: 9, isChecked: false }
  ];

  public andar = [
    { val: 0, isChecked: false },
    { val: 1, isChecked: false },
    { val: 2, isChecked: false },
    { val: 3, isChecked: false },
    { val: 4, isChecked: false },
    { val: 5, isChecked: false },
    { val: 6, isChecked: false },
    { val: 7, isChecked: false },
    { val: 8, isChecked: false },
    { val: 9, isChecked: false }
  ];

  public bahar = [
    { val: 0, isChecked: false },
    { val: 1, isChecked: false },
    { val: 2, isChecked: false },
    { val: 3, isChecked: false },
    { val: 4, isChecked: false },
    { val: 5, isChecked: false },
    { val: 6, isChecked: false },
    { val: 7, isChecked: false },
    { val: 8, isChecked: false },
    { val: 9, isChecked: false }
  ];

  cuttingForm = new FormGroup({
    name: new FormControl(''),
    mobile: new FormControl(''),
    commission: new FormControl(''),
    share: new FormControl(''),
    user_type: new FormControl('2'),
  });

  // for mat select form field
  // for mat select form field
  // for mat select form field
  // for mat select form field
  
  /** list of users */
  protected users: User[];

  /** control for the selected user for server side filtering */
  public userServerSideCtrl: FormControl = new FormControl();

  /** control for filter for server side. */
  public userServerSideFilteringCtrl: FormControl = new FormControl();

  /** indicate search operation is in progress */
  public searching = false;

  /** list of users filtered after simulating server side search */
  public  filteredServerSideUsers: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  
  // for mat select form field
  // for mat select form field
  // for mat select form field

  constructor(
    public alertController: AlertController,
    private loadingController: LoadingController,
    private route:ActivatedRoute,
    private http:HttpService) {
      this.createOrder();
    }

  ngOnInit() {
    //this.createOrder();
    // listen for search field value changes
    this.userServerSideFilteringCtrl.valueChanges.subscribe(response => {
        if(response == ''){
          return false;
        }
        this.searching = true;
        this.searchResult="Searching..."
        this.filteredServerSideUsers.next([]);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.searchUser(response); 
        }, 1000);
      },
      error => {
        // no errors in our simulated example
        this.searching = false;
        // handle error...
      });
  }

  searchUser(keyword){
    this.http.postRequest('/api/search-user',{'keyword':keyword},true).subscribe((response:User[])=>{
      this.users = response;
      this.searching = false;
      if(this.users.length == 0){
        this.searchResult = "No user found";
      }
      this.filteredServerSideUsers.next(this.users);
    });
  }

  createOrder(){
    this.presentLoading('Please wait...');
    this.route.queryParams.subscribe(param => {
      if(param.id){
        this.game_id = param.id;
      }else{
        return false;
      }
     
      this.http.postRequest('/api/orders',{'game_id':this.game_id},true).subscribe((response:Response)=>{
        this.loadingDismiss();
        if(response.status=='success'){
          this.order_id = response.data.id;
        }else{
          alert('Something went wrong! Please Try again.');
        }
      },error=>{
        this.loadingDismiss();
        alert('Something went wrong! Please Try again.');
      });

    });
  }

  updateOrder(formdata){
    this.http.putRequest('/api/orders/${this.order_id}',formdata,true).subscribe((response:Response)=>{
      this.loadingDismiss();
      if(response.status=='success'){
        this.order_id = response.data.id;
      }else{
        alert('Something went wrong! Please Try again.');
      }
    },error=>{
      this.loadingDismiss();
      alert('Something went wrong! Please Try again.');
    });
  }

  segmentChanged(event){
    this.gametype=event.target.value;
    console.log(this.gametype);
    this.enterAmount=null;
  }

// ################# cutting functions #########################
// ################# cutting functions #########################
// ################# cutting functions #########################
// ################# cutting functions #########################

  formatCutting(event){
    this.cuttingInput = event.target.value;
    this.cuttingSet = this.cuttingInput.replace(/\s+/g, '');
    
    let numbers = [];
    for (let i = 0; i < this.cuttingSet.length; i += 2) {
      numbers.push(this.cuttingSet.substr(i, 2));
    }

    this.cuttingInput = numbers.join(' ');
    this.cuttingSetToshow = numbers.join(', ');
    this.cuttingSet = numbers;

  }

  saveCutting(){
    var formdata = 1;
    if(this.order_id){
      this.updateOrder(formdata);
    }
  }


  // ################# Crossing functions #########################
  // ################# Crossing functions #########################
  // ################# Crossing functions #########################
  // ################# Crossing functions #########################

  joditypeChange(){
    this.formatedJodi = [];
    
    if(this.fixChangeType != this.joditype){
      this.finalSelectedCrossing = '';
      this.fixChangeType = this.joditype;
      console.log("clicked");
    }

    if(this.joditype=='jodi'){
      this.withoutjodi = [
        { val: 0, isChecked: false },
        { val: 1, isChecked: false },
        { val: 2, isChecked: false },
        { val: 3, isChecked: false },
        { val: 4, isChecked: false },
        { val: 5, isChecked: false },
        { val: 6, isChecked: false },
        { val: 7, isChecked: false },
        { val: 8, isChecked: false },
        { val: 9, isChecked: false }
      ];
    }else{
      this.jodi = [
        { val: 0, isChecked: false },
        { val: 1, isChecked: false },
        { val: 2, isChecked: false },
        { val: 3, isChecked: false },
        { val: 4, isChecked: false },
        { val: 5, isChecked: false },
        { val: 6, isChecked: false },
        { val: 7, isChecked: false },
        { val: 8, isChecked: false },
        { val: 9, isChecked: false }
      ];
    }
  }

  formatCrossing(){
    this.formatedJodi = [];
    if(this.joditype=='jodi'){
      this.selectedJodi = this.jodi.filter((a)=>{
        return a.isChecked==true;
      }).map((a)=>{
        return a.val;
      });

      console.log(this.selectedJodi);

      for(var i=0; i < this.selectedJodi.length; i++){
        for(var j=0; j < this.selectedJodi.length; j++){
          this.formatedJodi.push(this.selectedJodi[i].toString() + this.selectedJodi[j].toString());
        }
      }
    }else{
      this.selectedJodi = this.withoutjodi.filter((a)=>{
        return a.isChecked==true;
      }).map((a)=>{
        return a.val;
      });

      console.log(this.selectedJodi);

      for(var i=0; i < this.selectedJodi.length; i++){
        for(var j=0; j < this.selectedJodi.length; j++){
          if(i != j){
          this.formatedJodi.push(this.selectedJodi[i].toString() + this.selectedJodi[j].toString());
          }
        }
      }
      
    }
    console.log(this.formatedJodi);
    this.finalSelectedCrossing = this.formatedJodi;
  }

  jodinumSelected(i){
    this.jodi[i].isChecked = !this.jodi[i].isChecked;
    console.log(this.jodi);
    this.formatCrossing();
  }

  withoutjodinumSelected(i){
    this.withoutjodi[i].isChecked = !this.withoutjodi[i].isChecked;
    console.log(this.withoutjodi);
    this.formatCrossing();
  }

  // ################# harup functions #########################
  // ################# harup functions #########################
  // ################# harup functions #########################
  // ################# harup functions #########################
  harupTypeChange(){
    this.formatedHarup = [];
    
    if(this.fixChangeType != this.harupType){
      this.finalSelectedHarup = '';
      this.fixChangeType = this.harupType;
      console.log("clicked");
    }

    if(this.harupType=='bahar'){
      this.andar = [
        { val: 0, isChecked: false },
        { val: 1, isChecked: false },
        { val: 2, isChecked: false },
        { val: 3, isChecked: false },
        { val: 4, isChecked: false },
        { val: 5, isChecked: false },
        { val: 6, isChecked: false },
        { val: 7, isChecked: false },
        { val: 8, isChecked: false },
        { val: 9, isChecked: false }
      ];
    }else{
      this.bahar = [
        { val: 0, isChecked: false },
        { val: 1, isChecked: false },
        { val: 2, isChecked: false },
        { val: 3, isChecked: false },
        { val: 4, isChecked: false },
        { val: 5, isChecked: false },
        { val: 6, isChecked: false },
        { val: 7, isChecked: false },
        { val: 8, isChecked: false },
        { val: 9, isChecked: false }
      ];
    }
  }

  formatHarup(){
    this.formatedHarup = [];

    if(this.harupType=='andar'){
      this.selectedHarup = this.andar.filter((a)=>{
        return a.isChecked==true;
      }).map((a)=>{
        return a.val;
      });
  
      console.log(this.selectedHarup);

      for(var i=0; i < this.selectedHarup.length; i++){
        for(var j=0; j < 10; j++){
          this.formatedHarup.push(this.selectedHarup[i].toString() + j.toString());
        }
      }
    }else{
      this.selectedHarup = this.bahar.filter((a)=>{
        return a.isChecked==true;
      }).map((a)=>{
        return a.val;
      });
  
      console.log(this.selectedHarup);

      for(var i=0; i < this.selectedHarup.length; i++){
        for(var j=0; j < 10; j++){
          this.formatedHarup.push(j.toString() + this.selectedHarup[i].toString());
        }
      }
    }

    this.finalSelectedHarup = this.formatedHarup;

  }

  andarNumSelected(i){
    this.andar[i].isChecked = !this.andar[i].isChecked;
    console.log(this.andar);
    this.formatHarup();
  }

  baharNumSelected(i){
    this.bahar[i].isChecked = !this.bahar[i].isChecked;
    console.log(this.bahar);
    this.formatHarup();
  }


  // ################# To functions #########################
  // ################# To functions #########################
  // ################# To functions #########################
  // ################# To functions #########################

  fromtoChange(){
    
    this.formatedTo=[];
    if(this.toNumber <= this.fromNumber){
      this.toNumber = this.fromNumber+1;
      console.log(this.fromNumber,this.toNumber)
    }

    if(this.fromNumber!=null && this.toNumber != null && this.toNumber >= this.fromNumber){
      var diff = this.toNumber - this.fromNumber;
      for(var i=0; i<diff+1;i++){
        this.formatedTo.push(this.fromNumber+i);
      }
    }
    this.finalSelectedTo = this.formatedTo;
    console.log(this.finalSelectedTo,this.toNumber)
  }

  toChange(event){
    if(event.target.value <= this.fromNumber){
      this.toNumber = this.fromNumber+1;
      console.log(this.fromNumber,this.toNumber)
    }else{
      this.toNumber = event.target.value;
    }
  }

  // ################# Common functions #########################
  // ################# Common functions #########################
  // ################# Common functions #########################
  // ################# Common functions #########################

  async presentAlertConfirm(type,header) {

    if(type=='cutting'){
      this.total = this.enterAmount * this.cuttingSet.length;
      this.message = '<br> '+ this.cuttingSetToshow + ' <br><br> <b>Total : ' + this.total + '</b>';
    }else if(type=='crossing'){
      this.total = this.enterAmount * this.finalSelectedCrossing.length;
      this.message = '<br> '+ this.selectedJodi + ' <br><br> <b>Total : ' + this.total + '</b>';
    }else if(type=='harup'){
      this.total = this.enterAmount * this.selectedHarup.length;
      this.message = '<br> '+ this.selectedHarup + ' <br><br> <b>Total : ' + this.total + '</b>';
    }else if(type=='to'){
      this.total = this.enterAmount * this.formatedTo.length;
      this.message = '<br> '+ this.formatedTo + ' <br><br> <b>Total : ' + this.total + '</b>';
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: 'Are you sure you want to save this game?',
      message: this.message,
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
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertCheckbox() {
    this.checkboxArray = [];
    for(var i = 0; i < this.cuttingSet.length; i++){
      this.checkboxArray.push(
        {
          name: 'checkbox'+i,
          type: 'checkbox',
          label: this.cuttingSet[i],
          value: this.cuttingSet[i],
          cssClass: 'checkbox-button',
          handler: () => {
            console.log('Checkbox 1 selected');
          },
          checked: true
        }
      );
    }
  
    const alert = await this.alertController.create({
      cssClass: 'alert-check-box',
      header: 'Checkbox',
      mode:'ios',
      inputs: this.checkboxArray,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-button',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          cssClass: 'ok-button',
          handler: (data) => {
            console.log(data);
            this.cuttingInput = data.join(' ');
            this.cuttingSetToshow = data.join(', ');
            this.cuttingSet = data;
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