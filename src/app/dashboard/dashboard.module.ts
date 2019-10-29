import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { DashboardResolver } from './dashboard.resolver';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    resolve: { data: DashboardResolver }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage, DashboardComponent],
  providers: [DashboardResolver],
  entryComponents: [DashboardComponent]
})
export class DashboardPageModule {}
