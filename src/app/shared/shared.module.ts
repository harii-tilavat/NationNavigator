import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { GridGameComponent } from './grid-game/grid-game.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../_pipes/pipes.module';
import { IframeLoadComponent } from './iframe-load/iframe-load.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoockiePopupComponent } from './coockie-popup/coockie-popup.component';
import { HopAdComponent } from './hop-ad/hop-ad.component';
import { NgbModalModule } from './ng-modal';
import { VideoAdPopupComponent } from './ads/video-ad-popup/video-ad-popup.component';
import { HotGamesComponent } from './hot-games/hot-games.component';
import { GameService } from '../_services';
import { HttpClientModule } from '@angular/common/http';
import { SidePopupComponent } from './ads/side-popup/side-popup.component';
import { IconsModule } from "../icons/icons.module";
import { TmdHeadingComponent } from './tmd-heading/tmd-heading.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    GridGameComponent,
    IframeLoadComponent,
    CoockiePopupComponent,
    HopAdComponent,
    VideoAdPopupComponent,
    HotGamesComponent,
    SidePopupComponent,
    TmdHeadingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    HttpClientModule,
    IconsModule
],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    GridGameComponent,
    IframeLoadComponent,
    CoockiePopupComponent,
    HopAdComponent,
    VideoAdPopupComponent,
    SidePopupComponent,
    TmdHeadingComponent
  ],
  // providers:[GameService]
})
export class SharedModule { }
