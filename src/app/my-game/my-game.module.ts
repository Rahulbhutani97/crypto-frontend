import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyGamePageRoutingModule } from './my-game-routing.module';

import { MyGamePage } from './my-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyGamePageRoutingModule
  ],
  declarations: [MyGamePage]
})
export class MyGamePageModule {}
