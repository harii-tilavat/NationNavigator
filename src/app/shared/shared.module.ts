import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from "../icons/icons.module";
import { CountryCardComponent } from './country-card/country-card.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CountryCardComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IconsModule
],
  exports: [
    NavbarComponent,
    FooterComponent,
    CountryCardComponent,
    AboutComponent
  ],
  // providers:[GameService]
})
export class SharedModule { }
