import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Responce, JsResponse } from '../../shared/js-response';
import { Router, ActivatedRoute } from '@angular/router';
import { Billpayment } from 'src/app/shared/billpayment';
import { Tabledefinition } from 'src/app/shared/tabledefinition';
import { stringify } from '@angular/core/src/util';
import { DatePipe,formatDate } from '@angular/common';
import { LoginComponent } from 'src/app/login/login.component';
import { SidenavToolbarComponent } from 'src/app/ui/sidenav-toolbar/sidenav-toolbar.component';

@Component({
  selector: 'app-billpayment',
  templateUrl: './billpayment.component.html',
  styleUrls: ['./billpayment.component.css']
})
export class BillpaymentComponent implements OnInit {
  am =[];tr =[];bank_name : string; total_amount : number;transaction_id :string;
  bank : string;bank1 : string;bank2 : string;bank3 : string;type_of_payment : string;  Amoount : number;
  checked: boolean = false;checked1: boolean = false;checked2: boolean = false;checked3: boolean = false;checked4: boolean = false;
  checking1:boolean=false;checking2:boolean=false;checking3:boolean=false;checking4:boolean=false;checking5:boolean=false;
  banklist;walletlist;count : number = 0; tablelist : Responce;billment_id : number;
  table_name : number; table_pax : number; amount : number;bill_amount :number; due_amount : number;
  print_id : number;payment_status : string;table_defination_id : number;jsRes : JsResponse; 
  pendingg : boolean=true;  comp : boolean=true; paidouts : boolean=true; misCollections : boolean=true;
  reference : string; mobile_no : number; name : string; restaurent_id : number; billam : boolean = true;
  table_capatain : string;table_description : string;table_status : string;table_steward : string;table_view:string;
  name1 : string;name2:string;mobile_no1 : number;mobile_no2 : number; insert_date :string;today= new Date();

  constructor(public service1 : RestaurantService,public datepipe: DatePipe,private route: ActivatedRoute,public sidenav : SidenavToolbarComponent,public router : Router) {
    this.route.queryParams.subscribe(params => {
      this.table_name = params["tablename"];
      this.table_pax = params["pax"];
      this.amount = params["amount"];
      this.table_defination_id =params["tid"];
      this.restaurent_id = LoginComponent.rid;
    });
    console.log(this.table_name);console.log(this.table_defination_id);
   }

  ngOnInit() 
  {
    this.sidenav.ShowSpinnerHandler(true);
    // for (let i = 0; i < 5; i++) 
    // {
    //   this.am[i] = 0;
    // }
    this.service1.getbanks(this.restaurent_id).subscribe(data =>
    {
      this.banklist = data.Data;
    });
    this.service1.getwallets(this.restaurent_id).subscribe(data =>
    {
      this.walletlist = data.Data;
    });
    this.service1.Getbillpayemnts(this.restaurent_id).subscribe((data : Responce) =>
    {
      this.count = data.Data.length;
      this.billment_id = this.count + 1;
      console.log(data);
    });
    this.service1.getprintid(this.restaurent_id,this.table_defination_id).subscribe((data: Responce) =>
    {
      this.sidenav.ShowSpinnerHandler(false);
      this.print_id = data.Data[0].print_id;
    });
  }
  public onChange(event : number)
  {
    debugger;
    this.total_amount = this.am[0];
    if(parseInt(this.total_amount.toString()) > parseInt(this.amount.toString()))
    {
      this.am[0] = 0;
      alert("Please enter valid amount");
    }
    else
    {
      this.bank_name = "";
      this.total_amount = this.am[0];
      this.bill_amount = this.am[0];
      this.due_amount = this.amount - this.bill_amount;
      if(this.due_amount == 0)
      {
        this.payment_status = "Settled";
      }
      else if(this.due_amount != 0)
      {
        this.pendingg = false; this.comp = false;
      }
    }
  }
  public onChange1(event : number)
  {
    this.total_amount = this.am[1];
    if(parseInt(this.total_amount.toString()) > parseInt(this.amount.toString()))
    {
      this.am[1] = 0;
      alert("Please enter valid amount");
    }
    else
    {
      this.bank_name = this.bank;
      this.total_amount = this.am[1];
      this.bill_amount = this.am[1];
      this.due_amount = this.amount - this.bill_amount;
      if(this.due_amount == 0)
      {
        this.payment_status = "Settled";
      }
      else if(this.due_amount != 0)
      {
        this.pendingg = false; this.comp = false;
      }
    }
  }
  public onChange2(event : number)
  {
    this.total_amount = this.am[2];
    if(parseInt(this.total_amount.toString()) > parseInt(this.amount.toString()))
    {
      this.am[2] = 0;
      alert("Please enter valid amount");
    }
    else
    {
      this.bank_name = this.bank1;
      this.total_amount = this.am[2];
      this.bill_amount = this.am[2];
      this.due_amount = this.amount - this.bill_amount;
      if(this.due_amount == 0)
      {
        this.payment_status = "Settled";
      }
      else if(this.due_amount != 0)
      {
        this.pendingg = false; this.comp = false;
      }
    }
  }
  public onChange3(event : number)
  {
    this.total_amount = this.am[3];
    if(parseInt(this.total_amount.toString()) > parseInt(this.amount.toString()))
    {
      this.am[3] = 0;
      alert("Please enter valid amount");
    }
    else
    {
      this.bank_name = this.bank2;
      this.total_amount = this.am[3];
      this.bill_amount = this.am[3];
      this.due_amount = this.amount - this.bill_amount;
      if(this.due_amount == 0)
      {
        this.payment_status = "Settled";
      }
      else if(this.due_amount != 0)
      {
        this.pendingg = false; this.comp = false;
      }
    }
  }
  public onChange4(event : number)
  {
    this.total_amount = this.am[4];
    if(parseInt(this.total_amount.toString()) > parseInt(this.amount.toString()))
    {
      this.am[4] = 0;
      alert("Please enter valid amount");
    }
    else
    {
      this.bank_name = this.bank3;
      this.total_amount = this.am[4];
      this.bill_amount = this.am[4];
      this.due_amount = this.amount - this.bill_amount;
      if(this.due_amount == 0)
      {
        this.payment_status = "Settled";
      }
      else if(this.due_amount != 0)
      {
        this.pendingg = false; this.comp = false;
      }
    }
  }


  toggleVisibility(value){
    this.checked = !value;
    if(this.checked == true)
    {
      this.checking2 = true;this.checking1 = false;this.checking3 = true;
      this.checking4 = true;this.checking5 = true; 
    }
    else
    {
      this.checking2 = false;this.checking1 = false;this.checking3 = false;
      this.checking4 = false;this.checking5 = false;
    }
    if(this.checked == true)
    { 
      this.type_of_payment = "Cash"; this.Amoount = this.am[0];
    this.am[1] = 0;this.am[2] = 0;this.am[3] = 0;this.am[4] = 0;
    this.tr[0] = ""; this.tr[1] = "";this.tr[2] = "";this.tr[3] = "";
    this.bank = ""; this.bank1 = "";this.bank2 ="";this.bank3 ="";
    }
    else {this.type_of_payment = ""; this.Amoount = null;
    }
    console.log(this.checked);console.log(this.type_of_payment);
  }
  toggleVisibility1(value){
    this.checked1 = !value;
    if(this.checked1 == true)
    {
      this.checking2 = false;this.checking1 = true;this.checking3 = true;
      this.checking4 = true;this.checking5 = true;
    }
    else
    {
      this.checking2 = false;this.checking1 = false;this.checking3 = false;
      this.checking4 = false;this.checking5 = false;
    }
    if(this.checked1 == true)
    { 
      this.type_of_payment = "Card";this.Amoount = this.am[1];
      this.am[0] = 0;this.am[2]= 0;this.am[3]= 0;this.am[4]= 0;
      this.transaction_id = this.tr[0]; this.tr[1] = "";this.tr[2] = "";this.tr[3] = "";
      this.bank_name = this.bank; this.bank1 = "";this.bank2 ="";this.bank3 ="";
    }
    else { this.type_of_payment = "";this.Amoount = null;}
    console.log(this.checked1);console.log(this.type_of_payment);
  }
  toggleVisibility2(value){
    this.checked2 = !value;
    if(this.checked2 == true)
    {
      this.checking2 = true;this.checking1 = true;this.checking3 = false;
      this.checking4 = true;this.checking5 = true;
    }
    else
    {
      this.checking2 = false;this.checking1 = false;this.checking3 = false;
      this.checking4 = false;this.checking5 = false;
    }
    if(this.checked2 == true)
    { 
      this.type_of_payment = "Online";this.Amoount = this.am[2];
      this.am[0]= 0;this.am[1]= 0;this.am[3]= 0;this.am[4]= 0;
      this.transaction_id = this.tr[1]; this.tr[0] = "";this.tr[2] = "";this.tr[3] = "";
      this.bank_name = this.bank1; this.bank = "";this.bank2 ="";this.bank3 ="";
    }
    else {this.type_of_payment = ""; this.Amoount = null;}
    console.log(this.checked2);console.log(this.type_of_payment);
  }
  toggleVisibility3(value){
    this.checked3 = !value;
    if(this.checked3 == true)
    {
      this.checking2 = true;this.checking1 = true;this.checking3 = true;
      this.checking4 = false;this.checking5 = true;
    }
    else
    {
      this.checking2 = false;this.checking1 = false;this.checking3 = false;
      this.checking4 = false;this.checking5 = false;
    }
    if(this.checked3 == true)
    { 
      this.type_of_payment = "Wallet";this.Amoount = this.am[3];
      this.am[0]= 0;this.am[1]= 0;this.am[2]= 0;this.am[4]= 0;
      this.transaction_id = this.tr[2]; this.tr[1] = "";this.tr[0] = "";this.tr[3] = "";
      this.bank_name = this.bank2; this.bank1 = "";this.bank ="";this.bank3 ="";
    }
    else {this.type_of_payment = ""; this.Amoount = null;}
    console.log(this.checked3);console.log(this.type_of_payment);
  }
  toggleVisibility4(value){
    this.checked4 = !value;
    if(this.checked4 == true)
    {
      this.checking2 = true;this.checking1 = true;this.checking3 = true;
      this.checking4 = true;this.checking5 = false;
    }
    else
    {
      this.checking2 = false;this.checking1 = false;this.checking3 = false;
      this.checking4 = false;this.checking5 = false;
    }
    if(this.checked4 == true)
    { 
      this.type_of_payment = "Cheque";this.Amoount = this.am[4];
      this.am[0]= 0;this.am[1]= 0;this.am[2]= 0;this.am[3]= 0;
      this.transaction_id = this.tr[3]; this.tr[1] = "";this.tr[2] = "";this.tr[0] = "";
      this.bank_name = this.bank3; this.bank1 = "";this.bank2 ="";this.bank ="";
    }
    else {this.type_of_payment = "";this.Amoount = null; }
    console.log(this.checked4);console.log(this.type_of_payment);
  }
  
  public onpendingchange(value)
  {
    this.paidouts = !value;
    if(this.paidouts == true)
    {
      this.comp = true;this.pendingg = false;
      this.name = this.name1;this.mobile_no = this.mobile_no1;
      this.payment_status = "Pending";
    }
    else
    {
      this.comp = false;this.pendingg = false;
      this.name = this.name2;this.mobile_no = this.mobile_no2;
      this.payment_status = "Complementory";
    }
  }
  public oncompchange(value)
  {
    this.misCollections = !value;
    if(this.misCollections == true)
    {
      this.comp = false;this.pendingg = true;
      this.name = this.name2;this.mobile_no = this.mobile_no2;
      this.payment_status = "Complementory";
    }
    else
    {
      this.comp = false;this.pendingg = false;
      this.name = this.name1;this.mobile_no = this.mobile_no1;
      this.payment_status = "Pending";
    }
  }
  public onsubmitclick()
  {
    this.sidenav.ShowSpinnerHandler(true);
    let a : Billpayment = {
      billment_id : this.billment_id,
      table_name : this.table_name,
      table_pax : this.table_pax,
      amount : this.amount,
      bill_amount :this.bill_amount, 
      due_amount : this.due_amount,
      bank_name : this.bank_name,
      transaction_id :this.transaction_id,
      print_id : this.print_id,
      payment_mode : this.type_of_payment,
      payment_status : this.payment_status,
      table_defination_id : this.table_defination_id,
      name : this.name,
      mobile_no : this.mobile_no,
      reference : this.reference,
      restaurent_id : this.restaurent_id,
    }
    let b : Tabledefinition = {
      BACKGROUND_COLOR:"Green",
      restaurent_id:this.restaurent_id,
      table_defination_id : this.table_defination_id,
      table_capatain : this.table_capatain,
      table_description: this.table_description,
      table_name: this.table_name,
      table_pax: this.table_pax,
      table_status: this.table_status,
      table_steward: this.table_steward,
      table_view : this.table_view,
    }
    this.insert_date = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
    this.service1.billinsert(a).subscribe((data : JsResponse) =>
    {
      this.jsRes = data;
      this.sidenav.ShowSpinnerHandler(false);
      if(this.jsRes.code==200)
      {
        alert("BillPayment Added Succesfully.!");
        this.router.navigate(['/Home']); 
      }
      else{ alert("Failed to Insert data");}
    });
    console.log(this.insert_date);
    this.onclearclick();
    
  }
  onclearclick()
  {
    this.table_name = null; this.table_pax = null;this.amount = null;
    this.am[0] = "";this.am[1] = "";this.am[2] = "";this.am[3] = "";this.am[4] = "";
    this.tr[0] = "";this.tr[1] = "";this.tr[2] = "";this.tr[3] = "";
    this.bank = "";this.bank1 = "";this.bank2 = "";this.bank3 = "";
    this.due_amount = null;this.bill_amount = null;
    this.name1 =""; this.mobile_no1 = null;this.reference = "";
    this.name2 =""; this.mobile_no2 = null; 
    
  }
}
