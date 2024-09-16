import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ThemeModule } from './@theme/theme.module';
import { ToastrModule } from 'ngx-toastr';
import { HandleErrorsInterceptor } from './shared/interceptors/hander-errors.interceptor';
import { LoginGuard } from './shared/guards/login/login.guard';
import { AuthorizationGuard } from './shared/guards/authorization/authorization.guard';
import { HeaderInterceptor } from './shared/interceptors/headers.interceptor';
import { GraphQLModule } from './graphql.module';
import { MockInterceptor } from './shared/interceptors/mock.interceptor';
import { environment } from 'src/environments/environment';
import { GraphqlMockInterceptor } from './shared/interceptors/graphql-mock.interceptor';

const mockProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockInterceptor,
  multi: true,
};
const mockGraphql = {
  provide: HTTP_INTERCEPTORS,
  useClass: GraphqlMockInterceptor,
  multi: true,
};

const dynamicProviders = [];

environment.mock && dynamicProviders.push(mockProvider, mockGraphql);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ThemeModule,
    ToastrModule.forRoot(),
    GraphQLModule,
  ],
  providers: [
    LoginGuard,
    AuthorizationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleErrorsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    ...dynamicProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
