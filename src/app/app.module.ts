import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import{IndexComponent}from'./index/index.component';

import{HttpClientModule}from'@angular/common/http';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



import{NgxEchartsModule}from'ngx-echarts';


import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,IndexComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxEchartsModule,
    FormsModule,
  ],
  providers: [AppComponent,IndexComponent],
  bootstrap: [IndexComponent]
})
export class AppModule { }
