import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LedgerPageRoutingModule } from './ledger-routing.module';

import { LedgerPage } from './ledger.page';

import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LedgerPageRoutingModule,
    MatNativeDateModule,
    MatTableModule
  ],
  declarations: [LedgerPage]
})
export class LedgerPageModule {}
