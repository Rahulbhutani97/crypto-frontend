import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameDetailsPageRoutingModule } from './game-details-routing.module';

import { GameDetailsPage } from './game-details.page';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameDetailsPageRoutingModule,
  ],
  providers:[Screenshot, SocialSharing],
  declarations: [GameDetailsPage]
})
export class GameDetailsPageModule {}
