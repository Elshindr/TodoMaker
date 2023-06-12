import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TododetailComponent } from './components/tododetail/tododetail.component';
import { TodolstComponent } from './components/todolst/todolst.component';
import { ConnexionGuard } from './guards/connexion.guard';

const routes: Routes = [
  { path: 'home/:idUser', canActivate: [ ConnexionGuard ], component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'liste/:idUser/:id', canActivate: [ ConnexionGuard ], component: TododetailComponent },
  { path: 'liste/:idUser', canActivate: [ ConnexionGuard ], component: TodolstComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
