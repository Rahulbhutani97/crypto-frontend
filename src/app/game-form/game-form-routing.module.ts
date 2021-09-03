import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameFormPage } from './game-form.page';

const routes: Routes = [
  {
    path: '',
    component: GameFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameFormPageRoutingModule {}
