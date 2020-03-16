import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StartComponent } from './start/start.component';
import { ContentComponent } from './content-search/content.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', component: StartComponent, outlet: 'primary' },
  { path: 'login', component: LoginComponent, outlet: 'primary' },
  { path: 'content', component: ContentComponent, outlet: 'primary', canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'start', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
