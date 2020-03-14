import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

<<<<<<< HEAD
import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";

=======
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
>>>>>>> 24f974b9a98391a9152f85eb8de6cc37d982e5d1
const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: IndexComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterpageComponent },
<<<<<<< HEAD
  { path: "landing", component: LandingpageComponent }
=======
  { path: "landing", component: LandingpageComponent },
  { path :"tools", component : ToolsComponent},
  { path :"books", component : BooksComponent},
  { path :"movies", component : MoviesComponent},
  { path :"series", component : SeriesComponent},
  { path :"music", component : MusicComponent},
<<<<<<< HEAD
  { path :"games", component : GamesComponent},
>>>>>>> 24f974b9a98391a9152f85eb8de6cc37d982e5d1
=======
  { path :"games/:id", component : GamesComponent},
>>>>>>> parent of 24f974b... fifth commit
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
<<<<<<< HEAD
      useHash: true
=======
     
>>>>>>> 24f974b9a98391a9152f85eb8de6cc37d982e5d1
    })
  ],
  exports: []
})
export class AppRoutingModule {}
