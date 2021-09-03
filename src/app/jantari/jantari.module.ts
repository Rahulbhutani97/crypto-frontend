import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JantariPageRoutingModule } from './jantari-routing.module';

import { JantariPage } from './jantari.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JantariPageRoutingModule
  ],
  declarations: [JantariPage]
})
export class JantariPageModule {}
