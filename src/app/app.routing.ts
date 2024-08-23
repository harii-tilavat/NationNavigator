import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotGamesComponent } from './shared/hot-games/hot-games.component';

const routes: Routes = [
  // { path: 'sitemap.xml', redirectTo: 'sitemap.xml' },
  { path: 'hop', loadChildren: () => import('./contact-module/contact.module').then(m => m.ContactModule) },
  // { path: 'hotgames/:id', component: HotGamesComponent },
  { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
  // { path: '', redirectTo: '', pathMatch: 'full' },
  // { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
