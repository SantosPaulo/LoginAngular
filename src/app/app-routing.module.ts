import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPreloading } from './classes/custom-preloader';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthGuardGuard } from './core/guards/auth-guard.guard';
import { UnAuthGuardGuard } from './core/guards/un-auth-guard.guard';
import { AuthResolver } from './core/resolvers/auth-resolver';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    data: { preload: true },
    canActivate: [ UnAuthGuardGuard ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { preload: true },
    canActivate: [ AuthGuardGuard ],
    resolve: {
      auth: AuthResolver
    }
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloading
    })
  ],
  exports: [RouterModule],
  providers: [CustomPreloading]
})
export class AppRoutingModule { }
