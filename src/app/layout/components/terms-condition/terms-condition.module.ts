import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DmcaPolicyComponent } from './dmca-policy/dmca-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { TermsConditionComponent } from './terms-condition.component';

// const routes: Routes = [
//   {
//     path: '', component: TermsConditionComponent,
//     children: [
//       { path: '', redirectTo: 'terms-condition', pathMatch: 'full' },
//       { path: 'terms-condition', component: TermsAndConditionComponent, data: { title: 'HopGame Terms & Condition' } },
//       { path: 'privacy-policy', component: PrivacyPolicyComponent, data: { title: 'HopGame Privacy policy' } },
//       { path: 'dmca-policy', component: DmcaPolicyComponent, data: { title: 'HopGame DMCA Policy' } },
//       { path: '**', redirectTo: '', pathMatch: 'full' },
//     ],
//   },
//   { path: '**', redirectTo: '', pathMatch: 'full' }
// ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class TermsConditionModule { }
