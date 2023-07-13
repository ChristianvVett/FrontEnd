import { NgModule } from '@angular/core';

import {RouterModule,Routes} from '@angular/router'
import { HomeComponent } from './Home/home/home.component';
import { AboutComponent } from './About/about/about.component';

const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'about',component:AboutComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
