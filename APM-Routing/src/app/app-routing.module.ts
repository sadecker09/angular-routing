import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'welcome',
          component: WelcomeComponent,
        },
        // this is the default route (when app first loads)
        {
          path: '',
          redirectTo: 'welcome',
          pathMatch: 'full',
        },
        {
          path: 'products',
          canActivate: [AuthGuard],
          loadChildren: () =>
            import('./products/product.module').then((m) => m.ProductModule),
        },
        {
          path: '**',
          component: PageNotFoundComponent,
        },
      ],
      { preloadingStrategy: PreloadAllModules }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
