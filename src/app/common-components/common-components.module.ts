import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingComponent } from './loading/loading.component';
import { RequiredComponent } from './required/required.component';
import { AlertComponent } from './alert/alert.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { FormattedDateComponent } from './formatted-date/formatted-date.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    LoadingComponent,
    RequiredComponent,
    AlertComponent,
    FormErrorComponent,
    FormattedDateComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    PageNotFoundComponent,
    LoadingComponent,
    RequiredComponent,
    AlertComponent,
    FormErrorComponent,
    FormattedDateComponent
  ]
})
export class CommonComponentsModule { }
