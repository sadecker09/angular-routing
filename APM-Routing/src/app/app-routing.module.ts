import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';

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
          data: { preload: true }, // if true, uses custom preloading strategy
          loadChildren: () =>
            import('./products/product.module').then((m) => m.ProductModule),
        },
        {
          path: '**',
          component: PageNotFoundComponent,
        },
      ],
      { preloadingStrategy: SelectiveStrategy }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
