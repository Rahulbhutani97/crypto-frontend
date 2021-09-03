import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JantariPage } from './jantari.page';

const routes: Routes = [
  {
    path: '',
    component: JantariPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JantariPageRoutingModule {}
