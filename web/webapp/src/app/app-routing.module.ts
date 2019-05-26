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

const routes: Routes = [
  {path: 'books', component: BooksComponent},
  {path: 'books/add-book', component: AddBookComponent},
  {path: 'books/update-book/:id', component: UpdateBookComponent},
  {path: 'register/register-author', component: RegisterAuthorComponent},
  {path: 'login/login-author', component:LoginAuthorComponent},
  {path: 'sucess', component:SucessComponent},
  {path: 'author', component:AuthorComponent},
  {path: 'proposals/add-proposal', component: AddProposalComponent},
  {path: 'proposals/upload', component:UpdateProposalFileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
