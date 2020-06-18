import { Component, OnInit } from '@angular/core';
import { ChatbotService } from './chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  constructor(public chatBotService : ChatbotService) { }
  result;
  tabRes=[];
  tabMsg=[];
  msgs=[];
  affichage: {
    msg: any;
    res: any;
  }[]= [];
  textUser;
  valMsg: string;
  show1 : boolean;
  show2 : boolean;
  show: boolean;
  showBt : boolean;
  //result: BehaviorSubject<any>;

  ngOnInit() {
    this.show1=false;
    this.show2=false;
    this.show=false;
    this.showBt=true;
    
  }

  async  insertMessage(msg) {
      
      this.textUser= msg;
      this.tabMsg.push(msg);
      this.show1=true;
      console.log( this.textUser);
      this.result =  await this.chatBotService.getResult(this.textUser);
      let res = this.result;
      console.log( this.result);
      this.tabRes.push(this.result);
      this.show2=true;
      this.affichage.push({msg,res});



    }
    showChat() {
      console.log("clicked");
      this.show= true;
      this.showBt=false;
    }
    hideChat() {
      console.log("clicked2");
      this.show= false;
      this.showBt=true;
    }
    sendMessage(){
      console.log(this.valMsg);
      this.insertMessage(this.valMsg);
    }
}
