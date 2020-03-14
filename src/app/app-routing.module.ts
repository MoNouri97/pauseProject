import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";

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
  { path :"games/:id", component : GamesComponent},
>>>>>>> parent of 24f974b... fifth commit
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}