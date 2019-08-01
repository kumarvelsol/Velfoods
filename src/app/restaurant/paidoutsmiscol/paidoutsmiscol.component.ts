import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { HttpClient } from 'selenium-webdriver/http';
import { Apiresponse } from 'src/app/shared/apiresponse';
import { JsResponse } from 'src/app/shared/JsResponse';
import { Data } from 'src/app/shared/data';
import { Paidouts } from 'src/app/shared/paidouts';

@Component({
  selector: 'app-paidoutsmiscol',
  templateUrl: './paidoutsmiscol.component.html',
  styleUrls: ['./paidoutsmiscol.component.css']
})
export class PaidoutsmiscolComponent implements OnInit {
  rpaid : string; rmis : string; paidout_id : number;  paidout_name : string;
  paidout_pariticular : string;  paidout_reportingname : string;
  restaurent_id : number;  transaction_id : string; am =[];
  type_of_payment : string;  Amoount : number; jsRes : JsResponse; paiddata : Data[];
  bank_name : string;total_amount :number;Amount =[];total : number; paytypee : string;
  paytype = []; amount = []; tr = []; // paytypee = false;   
  masterSelected:boolean;
  checklist:any;
  checkedList:any;
  constructor(public service1 : RestaurantService) {
    this.masterSelected = false;
   }

  ngOnInit() {
    for (let i = 0; i < 5; i++) 
      {
        this.am[i] = 0;
      }

  }
  public onChange(event: number)
  {
    console.log(this.am);
    this.total_amount = 0;
      for (let i = 0; i < 5; i++) 
      {
      this.total_amount+= +this.am[i];
      this.Amount[i] = this.total_amount;
      this.total = this.Amount[i];
      }
      this.total_amount = this.total;
      console.log(this.total_amount);
}
  public onsubmitclick()
  {
    let a : Paidouts = {
    paidout_name : this.paidout_name,
    paidout_pariticular : this.paidout_pariticular,
    paidout_reportingname : this.paidout_reportingname,
    restaurent_id : 1,
    transaction_id : this.transaction_id,
    type_of_payment : this.paytypee,
    Amoount : this.total_amount,
    bank_name : this.bank_name
    } 
    this.service1.createpaidouts(a).subscribe((data : JsResponse) => 
    {
      this.jsRes = data;
        if(this.jsRes.code==200)
            {
              alert("Paidouts Added Succesfully.!");
            }else{ alert("Failed to Insert data");}
       });

       console.log(this.type_of_payment);
  }
  toggleVisibility(e){
    this.paytype[0] = e.target.checked;this.paytypee = this.paytype[0];
    console.log(this.paytypee);
  }
  toggleVisibilityy(e){
    debugger;
    this.paytype[1] = e.target.checked;this.paytypee = this.paytype[1];
    console.log(this.paytypee);
  }
  toggleVisibilitty(e){
    this.paytype[2] = e.target.checked;this.paytypee = this.paytype[2];
    console.log(this.paytypee);
  }
  toggleVisibiliity(e){
    this.paytype[3] = e.target.checked;this.paytypee = this.paytype[3];
    console.log(this.paytypee);
  }
}
 