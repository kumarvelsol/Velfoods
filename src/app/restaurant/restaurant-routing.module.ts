import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { TabledefinitionComponent } from './tabledefinition/tabledefinition.component';
import { PaidoutsmiscolComponent } from './paidoutsmiscol/paidoutsmiscol.component';
import { PropertyComponent } from './property/property.component';
import { TaxpageComponent } from './taxpage/taxpage.component';
import { RestaurantsComponent} from '../restaurants/restaurants.component';
import { ManagerComponent } from '../manager/manager.component';
import { TablereserveComponent } from './tablereserve/tablereserve.component';

const routes: Routes = [
  {path:'',pathMatch:'full',component:LoginpageComponent},
  {path:'property',component:PropertyComponent},
  {path:'tax',component:TaxpageComponent},
  {path:'restaurants',component:RestaurantsComponent},
  {path:'managers',component:ManagerComponent},
  {path:'tabledefinition',component:TabledefinitionComponent,pathMatch: 'full'},
  {path:'Paidouts',component:PaidoutsmiscolComponent},
  {path:'tablebooking',component:TablereserveComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }