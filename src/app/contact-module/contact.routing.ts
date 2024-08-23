import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from '../layout/components/contact/contact.component';
import { DmcaPolicyComponent } from '../layout/components/terms-condition/dmca-policy/dmca-policy.component';
import { PrivacyPolicyComponent } from '../layout/components/terms-condition/privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from '../layout/components/terms-condition/terms-and-condition/terms-and-condition.component';
import { ContactRootComponent } from './contact-root/contact-root.component';

const routes: Routes = [
  {
    path: '', component: ContactRootComponent,
    children: [
      { path: 'contact', component: ContactComponent, data: { title: 'HopGame Contact' } },
      { path: 'terms-condition', component: TermsAndConditionComponent, data: { title: 'HopGame Terms & Condition' } },
      { path: 'privacy-policy', component: PrivacyPolicyComponent, data: { title: 'HopGame Privacy policy' } },
      { path: 'dmca-policy', component: DmcaPolicyComponent, data: { title: 'HopGame DMCA Policy' } },
      // { path: '**', redirectTo: '', pathMatch: 'full', data: { title: 'HopGame Home' } }
    ]
  },
  { path: '**', redirectTo: 'hop', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
