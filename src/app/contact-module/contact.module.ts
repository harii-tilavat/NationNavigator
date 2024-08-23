import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact.routing';
import { ContactComponent } from '../layout/components/contact/contact.component';
import { DmcaPolicyComponent } from '../layout/components/terms-condition/dmca-policy/dmca-policy.component';
import { PrivacyPolicyComponent } from '../layout/components/terms-condition/privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from '../layout/components/terms-condition/terms-and-condition/terms-and-condition.component';
import { ContactRootComponent } from './contact-root/contact-root.component';
import { LayoutRoutingModule } from '../layout/layout.routing';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../_services';



@NgModule({
  declarations: [
    ContactComponent,
    TermsAndConditionComponent,
    PrivacyPolicyComponent,
    DmcaPolicyComponent,
    TermsAndConditionComponent,
    ContactRootComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactRoutingModule,
    SharedModule,
    LayoutRoutingModule,
    HttpClientModule
  ],
  providers: [GameService]
})
export class ContactModule { }
