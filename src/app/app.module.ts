import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatIconModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StartComponent } from './start/start.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { I1, I2 } from './services/interceptors';
import { LoginService } from './services/login-service';
import { AuthService } from './services/auth';
import { ToastrModule } from 'ngx-toastr';
import { ContentComponent } from './content-search/content.component';
import { AjaxContentService } from './services/ajax-content-service';
import { MaterialModule } from './material-module';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StartComponent,
    ContentComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      countDuplicates: true,
      resetTimeoutOnDuplicate: true,

    }),
    JwtModule.forRoot({
      config: {
        whitelistedDomains: [''],
        blacklistedRoutes: ['']
      }
    }),
    MaterialModule

  ],
  providers: [
    LoginService,
    AuthService,
    AjaxContentService,
    { provide: HTTP_INTERCEPTORS, useClass: I1, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: I2, multi: true },
    AuthGuard,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
