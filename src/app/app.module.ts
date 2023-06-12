import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/root/app.component';
import { HeaderComponent } from './components/header/header.component';
import { TodolstComponent } from './components/todolst/todolst.component';
import { HomeComponent } from './components/home/home.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { TododetailComponent } from './components/tododetail/tododetail.component';
import { RouterModule } from '@angular/router';
import { ProfilComponent } from './components/profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodolstComponent,
    HomeComponent,
    ConnexionComponent,
    TododetailComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
