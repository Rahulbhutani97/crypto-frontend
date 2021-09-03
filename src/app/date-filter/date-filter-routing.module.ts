import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateFilterPage } from './date-filter.page';

const routes: Routes = [
  {
    path: '',
    component: DateFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateFilterPageRoutingModule {}
