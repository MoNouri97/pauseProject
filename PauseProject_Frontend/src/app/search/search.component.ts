import { Component, OnInit } from '@angular/core';
import {SearchService } from "../search/search.service"
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  values = "";
  result=[];
  show: boolean;
  constructor(public search : SearchService, private router: Router) { }

  ngOnInit() {
    this.show = false;
  }
  onKey(event: string) { // with type info
    this.values = event;
    console.log(this.values);
    this.result = [];
    if(this.values) {
      this.search.getResult(this.values).subscribe(
        data => {  this.result = data;  
         console.log(data);
         if(this.result.length >0 ) {
          this.show=true;
          console.log(this.show);
         }
         else {
          this.show=false;
          console.log(this.show);
         }

       }
         ,err => console.error(err),()=>console.log('done') 
         ) 
         console.log(this.result)
  
  
  
  }
 
   
 
}
/*onKeyD(event: string) {
 this.result=[];
 if(event.length == 0)
  this.show= false;
}*/

onSelect(val) {
  console.log(val);
  this.router.navigate(['/',val.type, val.bid]);
}
}
