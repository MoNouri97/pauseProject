import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/examples/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import { ToolsComponent } from "./pages/examples/tools/tools.component";
import { BooksComponent } from './books/books.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MoviesComponent } from './movies/movies.component';
import { SeriesComponent } from './series/series.component';
import { MusicComponent } from './music/music.component';
import { GamesComponent } from './games/games.component';
import { LoginComponent } from './loginpage/login/login.component';
const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: IndexComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "landing", component: LandingpageComponent },
  { path :"tools", component : ToolsComponent},
  { path :"books", component : BooksComponent},
  { path :"movies", component : MoviesComponent},
  { path :"series", component : SeriesComponent},
  { path :"music", component : MusicComponent},
  { path :"games", component : GamesComponent},
  { path :"login", component : LoginComponent},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
     
    })
  ],
  exports: []
})
export class AppRoutingModule {}
