import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateFilterPageRoutingModule } from './date-filter-routing.module';

import { DateFilterPage } from './date-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateFilterPageRoutingModule
  ],
  declarations: [DateFilterPage]
})
export class DateFilterPageModule {}
