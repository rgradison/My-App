import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {NotesComponent} from './notes/notes.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RouterModule, Routes} from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

const appRoutes : Routes = [
  {
    path:'notes',
    component:NotesComponent
  },
  {
    path:'feedback',
    component:FeedbackComponent
  },
  {
    //Default route
    path:'',
    component:NotesComponent,
    pathMatch: 'full'
  },
  {
    path:'**',
    component:NotFoundComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotesComponent,
    NotFoundComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
