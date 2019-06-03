import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BooksComponent} from "./books/books.component";
import {AddBookComponent} from "./books/add-book/add-book.component";
import {UpdateBookComponent} from "./books/update-book/update-book.component";
import {RegisterAuthorComponent} from "@app/register/register-author/register-author.component";
import {LoginAuthorComponent} from "@app/login/login-author/login-author.component";
import {SucessComponent} from "@app/shared/sucess/sucess.component";
import {AuthorComponent} from "@app/author/author.component";
import {AddProposalComponent} from "@app/proposal/add-proposal/add-proposal.component";
import {UpdateProposalFileComponent} from "@app/proposal/update-proposal-file/update-proposal-file.component";
import {LoginChairComponent} from "@app/login/login-chair/login-chair.component";
import {LoginListenerComponent} from "@app/login/login-listener/login-listener.component";
import {LoginReviewerComponent} from "@app/login/login-reviewer/login-reviewer.component";
import {LoginComponent} from "@app/login/login.component";
import {ReviewerComponent} from "@app/reviewer/reviewer.component";
import {ChairComponent} from "@app/chair/chair.component";
import {ListenerComponent} from "@app/listener/listener.component";
import {RegisterComponent} from "@app/register/register.component";
import {RegisterListenerComponent} from "@app/register/register-listener/register-listener.component";
import {ReviewProposalComponent} from "@app/proposal/review-proposal/review-proposal.component";
import {AdminComponent} from "@app/admin/admin.component";
import {RegisterReviewerComponent} from "@app/register/register-reviewer/register-reviewer.component";

const routes: Routes = [
  {path: 'books', component: BooksComponent},
  {path: 'books/add-book', component: AddBookComponent},
  {path: 'books/update-book/:id', component: UpdateBookComponent},
  {path: 'register/register-author', component: RegisterAuthorComponent},
  {path: 'register/register-listener', component: RegisterListenerComponent},
  {path: 'register/register-reviewer', component: RegisterReviewerComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login/login-author', component:LoginAuthorComponent},
  {path: 'login/login-chair', component:LoginChairComponent},
  {path: 'login/login-reviewer', component:LoginReviewerComponent},
  {path: 'login/login-listener', component:LoginListenerComponent},
  {path: 'login', component:LoginComponent},
  {path: 'sucess', component:SucessComponent},
  {path: 'author', component:AuthorComponent},
  {path: 'proposals/add-proposal', component: AddProposalComponent},
  {path: 'proposals/review-proposal', component: ReviewProposalComponent},
  {path: 'proposals/upload', component:UpdateProposalFileComponent},
  {path: 'reviewer',component: ReviewerComponent},
  {path: 'listener', component:ListenerComponent},
  {path: 'chair', component:ChairComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
