import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { Routes } from '@angular/router';
import { LayoutRoutingModule } from './layout.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from "../icons/icons.module";
import { CountryDetailsComponent } from './components/country-details/country-details.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    CountryDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    HttpClientModule,
    IconsModule,
  ],
  exports: []
})
export class LayoutModule { }
