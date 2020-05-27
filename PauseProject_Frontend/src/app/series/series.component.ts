import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router} from '@angular/router';
import { SeriesService } from './series.service';
@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {
  public series = [];
  items = [];
  pageOfItems: Array<any>;
  page=1;
  id;
    constructor( private router : Router,private _SeriesService : SeriesService, private activatedRoute: ActivatedRoute ) { }
  
    ngOnInit() {
      this.activatedRoute.params.subscribe(paramsId => {
        this.id = paramsId.id; });
        this.pageChanged(1);}
    
         pageChanged(ind) {
          
          this._SeriesService.getSeries(ind)
          .subscribe(
          data => {  this.series = data;},err => console.error(err),()=>console.log('done') 
           ) }
           onSelect(serie) {
            this.router.navigate(['/serie', serie.id]);
           }

}
