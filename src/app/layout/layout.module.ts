import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { Routes } from '@angular/router';
import { LayoutRoutingModule } from './layout.routing';
import { PipesModule } from '../_pipes/pipes.module';
// import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PrivacyPolicyComponent } from './components/terms-condition/privacy-policy/privacy-policy.component';
// import { DmcaPolicyComponent } from './components/terms-condition/dmca-policy/dmca-policy.component';
// import { TermsAndConditionComponent } from './components/terms-condition/terms-and-condition/terms-and-condition.component';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from '../_services';
import { TestMicrophoneComponent } from './components/test-microphone/test-microphone.component';
import { TestHeadphonesComponent } from './components/test-headphones/test-headphones.component';
import { IconsModule } from "../icons/icons.module";
import { WebcamModule } from 'ngx-webcam';
import { CountryDetailsComponent } from './components/country-details/country-details.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    TestMicrophoneComponent,
    TestHeadphonesComponent,
    CountryDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    HttpClientModule,
    IconsModule,
    WebcamModule
  ],
  providers: [GameService],
  exports: [

  ]
})
export class LayoutModule { }
