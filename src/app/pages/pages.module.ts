import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";
<<<<<<< HEAD

import { IndexComponent } from "./index/index.component";
import { ProfilepageComponent } from "./examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./examples/landingpage/landingpage.component";
=======
import {ToolsComponent } from "./examples/tools/tools.component";
import { IndexComponent } from "./examples/index/index.component";
import { ProfilepageComponent } from "./examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./examples/landingpage/landingpage.component";
import { BooksComponent } from '../books/books.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MoviesComponent } from '../movies/movies.component';
import { SeriesComponent } from '../series/series.component';
import { GamesComponent } from '../games/games.component';
import { MusicComponent } from '../music/music.component';
>>>>>>> 24f974b9a98391a9152f85eb8de6cc37d982e5d1

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
<<<<<<< HEAD
    LandingpageComponent
=======
    LandingpageComponent,
    ToolsComponent,
    BooksComponent,
    HeaderComponent,
    FooterComponent,
    MoviesComponent,
    SeriesComponent,
    GamesComponent,
    MusicComponent
    
>>>>>>> 24f974b9a98391a9152f85eb8de6cc37d982e5d1
  ],
  exports: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
<<<<<<< HEAD
    LandingpageComponent
=======
    LandingpageComponent,
    ToolsComponent,
    BooksComponent,
    HeaderComponent,
    FooterComponent,
    MoviesComponent,
    SeriesComponent,
    GamesComponent,
    MusicComponent
>>>>>>> 24f974b9a98391a9152f85eb8de6cc37d982e5d1
  ],
  providers: []
})
export class PagesModule {}
