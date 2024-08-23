import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './components/home/home.component';
import { LatestComponent } from './components/latest/latest.component';
import { RecentComponent } from './components/recent/recent.component';
import { TrendingComponent } from './components/trending/trending.component';
import { SharedModule } from '../shared/shared.module';
import { Routes } from '@angular/router';
import { FeaturedComponent } from './components/featured/featured.component';
import { LayoutRoutingModule } from './layout.routing';
import { CategoryComponent } from './components/category/category.component';
import { PlayGameComponent } from './components/play-game/play-game.component';
import { PipesModule } from '../_pipes/pipes.module';
// import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PrivacyPolicyComponent } from './components/terms-condition/privacy-policy/privacy-policy.component';
// import { DmcaPolicyComponent } from './components/terms-condition/dmca-policy/dmca-policy.component';
// import { TermsAndConditionComponent } from './components/terms-condition/terms-and-condition/terms-and-condition.component';
import { Games3dComponent } from './components/games3d/games3d.component';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from '../_services';
import { TestMicrophoneComponent } from './components/test-microphone/test-microphone.component';
import { TestHeadphonesComponent } from './components/test-headphones/test-headphones.component';
import { TestWebcamComponent } from './components/test-webcam/test-webcam.component';
import { IconsModule } from "../icons/icons.module";
import { WebcamModule } from 'ngx-webcam';



@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    LatestComponent,
    RecentComponent,
    TrendingComponent,
    CategoryComponent,
    FeaturedComponent,
    PlayGameComponent,
    Games3dComponent,
    TestMicrophoneComponent,
    TestHeadphonesComponent,
    TestWebcamComponent,
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
    PlayGameComponent
  ]
})
export class LayoutModule { }
