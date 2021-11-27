import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { LoaderAlertService } from '../services/loader-alert.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { Platform } from '@ionic/angular';

interface responseData{
  status:string,
  data:any
}

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
})
export class GameDetailsPage implements OnInit {
  order_id:any;
  order:any;
  error:any;
  constructor(
    private route:ActivatedRoute,
    private http:HttpService,
    private loader:LoaderAlertService,
    private socialSharing: SocialSharing,
    private screenshot: Screenshot,
    private platform : Platform
    ) { }
    
    ngOnInit() {
      this.route.queryParams.subscribe(param => {
        if(param.id){
          this.order_id = param.id;
        }
      })
      
      console.log(this.order_id);
      this.getOrderDetails();
    }
    
    getOrderDetails(){
      this.loader.presentLoading('Please wait...');
      this.http.getRequest('/api/order-details/'+this.order_id,true).subscribe((response:responseData)=>{
        this.loader.loadingDismiss();
        
        if(response.status){
          this.order = response.data;
          console.log(this.order);
        }else{
          alert('Something went wrong!');
        }
      },(error)=>{
        //console.log(error);
        this.loader.loadingDismiss();
        this.error = error.error.errors;
      });
    }
    
    shareScreenshot(){
      this.platform.ready().then(() => {
        this.screenshot.URI(80)
          .then((res) => {
            console.log('res',res);
            
           //this.socialSharing.share('df',res.URI,null)
           this.socialSharing.share('',null,res.URI,null)
             .then(() => {},
               () => { 
                 alert('SocialSharing failed');
               });
             },
            () => {
            alert('Screenshot failed');
            });
          });
    }

    // shareScreenShot(){
    //   // this.screenshot.save('jpg', 80, 'myscreenshot.jpg').then(
    //   //   () => alert('got it'),
    //   //   (err) => console.log(err)
    //   //   );
    //     const onSuccess=(res)=>{
    //       console.log(res);
    //       // Share via email
    //       // this.socialSharing.share('Body', 'Subject', res.URI).then(() => {
    //       //   // Success!
    //       // }).catch(() => {
    //       //   // Error!
    //       // });
    //     }
    //     const onError = (err)=>{
    //       console.log('aa');
    //     }
    //     this.screenshot.URI(80).then(onSuccess, onError);
    //   }
      
      numberOrderTotal(numbers){
        let sum: number = numbers.map(a => a.amount).reduce(function(a, b)
        {
          return a + b;
        });
        //console.log(sum);
        return sum;
      }
      
      paid(){
        alert('Paid');
      }

    }
    