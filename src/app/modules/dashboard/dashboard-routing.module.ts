import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageOneComponent } from './components/page-one/page-one.component';
import { PageTwoComponent } from './components/page-two/page-two.component';
import { PageThreeComponent } from './components/page-three/page-three.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'page-one', component: PageOneComponent, data: { animation: 'in' } },
      { path: 'page-two', component: PageTwoComponent, data: { animation: 'in' } },
      { path: 'page-three', component: PageThreeComponent, data: { animation: 'in' } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
