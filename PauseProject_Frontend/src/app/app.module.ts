import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import {AngularFireModule}from'angularfire2'
import{AngularFirestoreModule} from 'angularfire2/firestore';
import{AngularFireAuthModule} from 'angularfire2/auth';

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
import { PagesModule } from "./pages/pages.module";
import {ToolsComponent} from "./pages/examples/tools/tools.component"
import { IndexComponent } from "./pages/examples/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import { BooksComponent } from './books/books.component';
import { BooksService } from './books/books.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MoviesComponent } from './movies/movies.component';
import { GamesComponent } from './games/games.component';
import { SeriesComponent } from './series/series.component';
import { MusicComponent } from './music/music.component';
import { MoviesService } from './movies/movies.service';
import { SeriesService } from './series/series.service';
import { GamesService } from './games/games.service';
import { MusicService } from './music/music.service';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './loginpage/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
   // MoviesComponent,
    //GamesComponent,
   // SeriesComponent,
   // MusicComponent,
   //FooterComponent,
    //HeaderComponent,
    // IndexComponent,
    // ProfilepageComponent,
    // RegisterpageComponent,
    // LandingpageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    
    // BsDropdownModule.forRoot(),
    // ProgressbarModule.forRoot(),
    // TooltipModule.forRoot(),
    // CollapseModule.forRoot(),
    // TabsModule.forRoot(),
    PagesModule
    // PaginationModule.forRoot(),
    // AlertModule.forRoot(),
    // BsDatepickerModule.forRoot(),
    // CarouselModule.forRoot(),
    // ModalModule.forRoot()
  ],
  providers: [BooksService,
  MoviesService,
  SeriesService,
  GamesService,
  MusicService],
  bootstrap: [AppComponent]
})
export class AppModule {}