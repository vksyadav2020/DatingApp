import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  @Output() CancelledRegister=new EventEmitter();
  model:any={}
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
  }
  register(){
    this.accountService.register(this.model).subscribe(responce=>{
      console.log(responce);
      this.cancelled();
    },error=>{
      console.log(error);
    });
    
  }
  cancelled(){
    this.CancelledRegister.emit(false);
  }

}
