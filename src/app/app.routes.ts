import { Routes } from '@angular/router';
import { InventoryPageComponent } from './inventory/pages/inventory/inventoryPage/inventoryPage.component';
import { SingUpPageComponent } from './inventory/pages/singUpPage/singUpPage.component';
import { LoginPageComponent } from './inventory/pages/login/login/login';
import { authGuard } from './guards/guards-guard';

export const routes: Routes = [



  {
    path: '',
    component: SingUpPageComponent,
  },
  {
    path:'inventory',
    canMatch: [authGuard],
    component: InventoryPageComponent,
  },
  {
    path:'login',
    component: LoginPageComponent,
  }
  ,
  {
    path:'**',
    loadComponent: ()=>import('./components/not-found/not-found').then(comp=>comp.NotFound),
  }

];
