import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './layout.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, data: { title: 'Country Finder - Nation Navigator' } },
      { path: 'country/:code', component: CountryDetailsComponent, data: { title: 'Country Finder - Country details' } },
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
