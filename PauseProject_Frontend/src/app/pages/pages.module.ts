import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ToolsComponent } from './examples/tools/tools.component';
import { IndexComponent } from './examples/index/index.component';
import { ProfilepageComponent } from './examples/profilepage/profilepage.component';
import { RegisterpageComponent } from './examples/registerpage/registerpage.component';
import { LandingpageComponent } from './examples/landingpage/landingpage.component';
import { BooksComponent } from '../books/books.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MoviesComponent } from '../movies/movies.component';
import { SeriesComponent } from '../series/series.component';
import { GamesComponent } from '../games/games.component';
import { GameCardComponent } from '../games/game-card/game-card.component';
import { MusicComponent } from '../music/music.component';
import { ContactusComponent } from './examples/contactus/contactus.component';
import { SearchComponent } from '../search/search.component';
import { MusicCardComponent } from '../music/music-card/music-card.component';
import { MovieCardComponent } from '../movies/movie-card/movie-card.component';
//import { JwPaginationComponent } from 'jw-angular-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChatbotComponent} from '../chatbot/chatbot.component';
//import { NbLayoutModule, NbChatModule, NbSpinnerModule } from '@nebular/theme';
//import { NbEvaIconsModule } from '@nebular/eva-icons';


import { RecommendationsComponent } from './examples/recommendations/recommendations.component';
import { HomeCardsComponent } from '../home-cards/home-cards.component';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    NgbModule,
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
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
    
  ],
  declarations: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    ToolsComponent,
    BooksComponent,
    HeaderComponent,
    FooterComponent,
    MoviesComponent,
    SeriesComponent,
    GamesComponent,
    GameCardComponent,
    MusicComponent,
    ContactusComponent,
    SearchComponent,
    MusicCardComponent,
    MovieCardComponent,
    ChatbotComponent,
    HomeCardsComponent,
  
	
		RecommendationsComponent,
   // JwPaginationComponent,
  ],
  exports: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    ToolsComponent,
    BooksComponent,
    HeaderComponent,
    FooterComponent,
    MoviesComponent,
    SeriesComponent,
    GamesComponent,
    MusicComponent,
    SearchComponent,
    PaginationModule,
    ChatbotComponent,
    //JwPaginationComponent,
  ],
  providers: [],
})
export class PagesModule {}
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}
