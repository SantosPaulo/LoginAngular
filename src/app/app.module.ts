import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
import { AuthResolver } from './core/resolvers/auth-resolver';
import { SessionExpiredInterceptor } from './core/interceptors/session-expired-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { SessionExpiredComponent } from './core/components/session-expired/session-expired.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SessionExpiredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [
    AuthResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionExpiredInterceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [
    SessionExpiredComponent
  ]
})
export class AppModule { }
