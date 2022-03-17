import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReserveComponent } from './locker/reserve/reserve.component'

const routes: Routes = [
  {path: 'reserve', component: ReserveComponent},
  { path: '**', redirectTo: 'reserve'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
