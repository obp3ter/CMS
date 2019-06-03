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
import { AuthorComponent } from './author/author.component';
import { AddProposalComponent } from './proposal/add-proposal/add-proposal.component';
import { PrintProposalComponent } from './proposal/print-proposal/print-proposal.component';
import { UpdateProposalFileComponent } from './proposal/update-proposal-file/update-proposal-file.component';
import { LoginListenerComponent } from './login/login-listener/login-listener.component';
import { LoginReviewerComponent } from './login/login-reviewer/login-reviewer.component';
import { LoginChairComponent } from './login/login-chair/login-chair.component';
import { ReviewerComponent } from './reviewer/reviewer.component';
import { ListenerComponent } from './listener/listener.component';
import { ChairComponent } from './chair/chair.component';
import { RegisterComponent } from './register/register.component';
import { RegisterListenerComponent } from './register/register-listener/register-listener.component';
import { ReviewProposalComponent } from './proposal/review-proposal/review-proposal.component';
import { AdminComponent } from './admin/admin.component';
import { DeadlineInputComponent } from './admin/deadline-input/deadline-input.component';
import { ChairRegisterComponent } from './register/chair-register/chair-register.component';
import { SessionsComponent } from './sessions/sessions.component';
import {AddSessionComponent} from "@app/sessions/add-session/add-session.component";
import {AssignProposalComponent} from "@app/proposal/assign-proposal/assign-proposal.component";



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
    AuthorComponent,
    AddProposalComponent,
    PrintProposalComponent,
    UpdateProposalFileComponent,
    LoginListenerComponent,
    LoginReviewerComponent,
    LoginChairComponent,
    ReviewerComponent,
    ListenerComponent,
    ChairComponent,
    RegisterComponent,
    RegisterListenerComponent,
    AdminComponent,
    ReviewProposalComponent,
    DeadlineInputComponent,
    ChairRegisterComponent,
    SessionsComponent,
    AddSessionComponent,
    AssignProposalComponent,

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
