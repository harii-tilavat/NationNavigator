import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AdService } from './_services/adservice/ad.service';
import { ScriptLoaderService } from './_services/script-loader/script-loader.service';
import { SharedModule } from './shared/shared.module';
import { CookieService, GameService } from './_services';

import { ReactiveFormsModule } from '@angular/forms';
import { GoogletagInitService } from './_services/googletag-init/googletag-init.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { IconsModule } from './icons/icons.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    IconsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      progressBar: false,
      easing: 'ease-in',
      timeOut: 30000,
      closeButton: true
    }),
  ],
  providers: [
    AdService,
    CookieService,
    ToastrService,
    { provide: 'window', useFactory: getWindow },
    {
      provide: APP_INITIALIZER,
      useFactory: (googletagInitService: GoogletagInitService) => googletagInitService.initGoogletag(),
      deps: [GoogletagInitService],
      multi: true
    },
    ScriptLoaderService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getWindow() {
  return (typeof window !== 'undefined') ? window : null;
}
