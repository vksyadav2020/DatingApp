import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  @Output() CancelledRegister=new EventEmitter();
  model:any={}
  constructor(private accountService:AccountService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  register(){
    this.accountService.register(this.model).subscribe(responce=>{
      console.log(responce);
      this.cancelled();
    },error=>{
      console.log(error);
      this.toastr.error(error.error);
    });
    
  }
  cancelled(){
    this.CancelledRegister.emit(false);
  }

}
