import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'games',
    canActivate: [AuthGuard],
    loadChildren: () => import('./games/games.module').then( m => m.GamesPageModule)
  },
  {
    path: 'game-form',
    canActivate: [AuthGuard],
    loadChildren: () => import('./game-form/game-form.module').then( m => m.GameFormPageModule)
  },
  {
    path: 'ledger',
    canActivate: [AuthGuard],
    loadChildren: () => import('./ledger/ledger.module').then( m => m.LedgerPageModule)
  },
  {
    path: 'jantari',
    canActivate: [AuthGuard],
    loadChildren: () => import('./jantari/jantari.module').then( m => m.JantariPageModule)
  },
  {
    path: 'add-game',
    canActivate: [AuthGuard],
    loadChildren: () => import('./add-game/add-game.module').then( m => m.AddGamePageModule)
  },
  {
    path: 'my-game',
    canActivate: [AuthGuard],
    loadChildren: () => import('./my-game/my-game.module').then( m => m.MyGamePageModule)
  },
  {
    path: 'date-filter',
    canActivate: [AuthGuard],
    loadChildren: () => import('./date-filter/date-filter.module').then( m => m.DateFilterPageModule)
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },  {
    path: 'add-user',
    loadChildren: () => import('./add-user/add-user.module').then( m => m.AddUserPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
