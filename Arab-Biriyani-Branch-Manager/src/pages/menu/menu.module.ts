import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClientModule } from  '@angular/common/http';

import { MenuPage } from './menu';

@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
	HttpClientModule
  ],
  exports: [
    MenuPage
  ]
})
export class MenuPageModule { }
