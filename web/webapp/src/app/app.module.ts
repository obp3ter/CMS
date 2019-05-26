import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { PrintBookComponent } from './books/print-book/print-book.component';
import {AddBookComponent} from "./books/add-book/add-book.component";
import { UpdateBookComponent } from './books/update-book/update-book.component';
import {BookService} from "./books/shared/book.service";
import { LoginComponent } from './login/login.component';
import { RegisterAuthorComponent } from './register/register-author/register-author.component';
import { LoginAuthorComponent } from './login/login-author/login-author.component';
import { SucessComponent } from './shared/sucess/sucess.component';



@NgModule({
  declarations: [
    AppComponent,

    BooksComponent,
    PrintBookComponent,
    AddBookComponent,
    UpdateBookComponent,
    LoginComponent,
    RegisterAuthorComponent,
    LoginAuthorComponent,
    SucessComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
