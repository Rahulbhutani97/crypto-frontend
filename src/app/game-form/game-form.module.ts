import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameFormPageRoutingModule } from './game-form-routing.module';

import { GameFormPage } from './game-form.page';
import { AppOnlyNumberDirective } from '../directives/app-only-number.directive';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CuttingNumberOnpasteDirective } from '../directives/cutting-number-onpaste/cutting-number-onpaste.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameFormPageRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ],
  declarations: [GameFormPage, AppOnlyNumberDirective, CuttingNumberOnpasteDirective]
})
export class GameFormPageModule {}
