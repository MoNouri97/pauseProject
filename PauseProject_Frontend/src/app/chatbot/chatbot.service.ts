import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  baseURL: string ="https://api.dialogflow.com/v1/query?v=20150910";
  token1: string ='84b2e3f8f82641cc8fad8ee146235352';
  speech : any; 
 
  t: BehaviorSubject<any>;//[];
  constructor(private http: HttpClient) { }
    async getResult(msg : string) {
    const data = {
      query: msg,
      lang: 'en',
      sessionId: '12345'
      };
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token1}` });
      let options = { headers: headers };
       this.http.post(this.baseURL, data,options ).subscribe(async  (res:any)  => {
       this.t =  await  res.result.fulfillment.speech;
        
        
 
      })
      await this.delay(500);
      console.log(await this.t);
      return await this.t;
      }

        delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
  }
