import { NgModule } from '@angular/core';

import {RouterModule,Routes} from '@angular/router'
import { HomeComponent } from './Home/home/home.component';
import { AboutUsComponent } from './About_us/about-us/about-us.component';

const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'About_us',component:AboutUsComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
