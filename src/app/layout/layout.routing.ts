import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './layout.component';
import { TestWebcamComponent } from './components/test-webcam/test-webcam.component';
import { TestHeadphonesComponent } from './components/test-headphones/test-headphones.component';
import { TestMicrophoneComponent } from './components/test-microphone/test-microphone.component';


// const routes: Routes = [
//   { path: '', component: HomeComponent, data: { title: 'Nugget Home' } },
//   { path: 'product', component: ProductComponent, data: { title: 'Product Home' } },
//   { path: 'pricing', component: PricingComponent, data: { title: 'Pricing Home' } },
//   { path: 'teams/:id', component: TeamsComponent, data: { title: 'Teams Home' } },
//   { path: 'about', component: AboutComponent, data: { title: 'About Home' } },
//   { path: 'contact', component: ContactComponent, data: { title: 'Contact Home' } },
//   { path: 'resources', component: ResourceComponent, data: { title: 'Resource Home' } },
//   { path: 'resources/:id', component: ResourceDetailsComponent, data: { title: 'Resource Details' } },
//   { path: 'blog', component: BlogComponent, data: { title: 'Blog Home' } },
//   { path: 'blog/:id', component: BlogDetailsComponent, data: { title: 'Blog Details' } },
//   { path: 'terms/:id', component: PrivacyPolicyComponent, data: { title: 'Privacy Policy' } },
//   { path: '', redirectTo: '', pathMatch: 'full' },
//   { path: '**', redirectTo: '', pathMatch: 'full' }
// ];

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, data: { title: 'HopGame Home' } },
      { path: 'webcam', component: TestWebcamComponent, data: { title: 'Test Webcam ' } },
      { path: 'headphones', component: TestHeadphonesComponent, data: { title: 'Test Headphones ' } },
      { path: 'microphone', component: TestMicrophoneComponent, data: { title: 'Test Microphone ' } },
      { path: '**', redirectTo: '', pathMatch: 'full', data: { title: 'HopGame Home' } }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
