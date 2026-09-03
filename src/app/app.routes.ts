import { Routes } from '@angular/router';
import { InventoryPageComponent } from './inventory/pages/inventory/inventoryPage/inventoryPage.component';
import { SingUpPageComponent } from './inventory/pages/singUpPage/singUpPage.component';
import { LoginPageComponent } from './inventory/pages/login/login/login';
import { authGuard } from './guards/guards-guard';
import { ChoseInventoryDistribution } from './inventory/pages/choseInventoryDistribution/choseInventoryDistribution';
import { CreateYourOwnInventory } from './inventory/pages/createYourOwnInventory/createYourOwnInventory/createYourOwnInventory';
import { JointToInventory } from './inventory/pages/jointToInventory/jointToInventory';

export const routes: Routes = [



  {
    path: '',
    component: SingUpPageComponent,
  },

  {
    path:'join-inventory',
    canMatch: [authGuard],
    component: JointToInventory,
  },
  {
    path:'create-inventory',
    canMatch: [authGuard],
    component: CreateYourOwnInventory,
  },
  {
    path:'inventory',
    canMatch: [authGuard],
    component: InventoryPageComponent,
  },
   {
    path:'chose-inventory-distribution',
    canMatch: [authGuard],
    component: ChoseInventoryDistribution,
  }
  ,
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
