import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode:boolean=false;
  user:any;
  constructor() { }

  ngOnInit(): void {
    
  }
  registerToggle(){
    this.registerMode=!this.registerMode;
  }
  cancelRegistermode(event:boolean){
    this.registerMode=event;
  }
  

}