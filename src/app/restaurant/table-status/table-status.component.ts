import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { order, room } from 'src/app/Model/ordermodel';
import { RestaurantService } from '../restaurant.service';
import { DatePipe } from '@angular/common';
import { Responce, Data, JsResponse } from 'src/app/shared/js-response';
import { OffersDialogComponent } from '../offers-dialog/offers-dialog.component';
import { MatDialog, MatTable, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { Prints } from 'src/app/shared/interfaces/Prints';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { SidenavToolbarComponent } from 'src/app/ui/sidenav-toolbar/sidenav-toolbar.component';
export interface PeriodicElement {
  ItemName : string;
  Rate : number;
  Tax : number;
  Quantity : number;
  Total : number;
}
export interface ParsingData {
  table_name : number;
  total_amount : number;
  DiscountAmount : number;
  AmountAfterDiscount : number;
  OfferId : number;
  Percentage : number;
  MinBillAmount : number;
  MaxDiscountAmount : number;
  PromoCode : string;
}
@Component({
  selector: 'app-table-status',
  templateUrl: './table-status.component.html',
  providers: [ServiceService],
  styleUrls: ['./table-status.component.css']
})
export class TableStatusComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>; 
  constructor(private service : RestaurantService,public datepipe: DatePipe,public dialog: MatDialog,private router: Router,private route: ActivatedRoute,public sidenav : SidenavToolbarComponent) {
    this.route.queryParams.subscribe(params => {
      this.restaurent_id = LoginComponent.rid;
    });
   }
  userlist:order;
  rooms : room[];
  count: number;
  kot_id:number;
  tables :Data[]; table_pax : number;
  listcount : number;tname:number; table_name : number;table_defination_id : number;
  itemnames:any[] =[];
  Rate:any[] =[];
  quantity:any[] =[];
  total:any[] =[];
  restaurent_id:number;
  tax:any[] =[]; totalamount : number; amount : number; 
  rows: Array<{order_itemname:string, order_rate:number,order_tax:number,order_quantity:number,order_totalamount:number}> = [];
  array =[];
  dataSource ;
  displayedColumns: string[] = ['order_itemname', 'order_rate', 'order_tax', 'order_quantity','order_totalamount'];
  Payment_disable : boolean;
  availOffer_disable : boolean;
  print_disable : boolean;
  tables_disable : boolean; 
  offerappliedtext_disable : boolean;
  ngOnInit()
  {
    this.Payment_disable = true;
    this.availOffer_disable = true;
    this.print_disable = true;
    this.tables_disable = false;
    this.offerappliedtext_disable = false;
    this.LoadingList();
  }
  LoadingList(){
    this.sidenav.ShowSpinnerHandler(true);
    this.service.gettabledata(this.restaurent_id).subscribe((data : Responce) =>
    {
      this.count = data.Data.length;
      this.kot_id = this.count + 1;
      console.log(data);
      for(let i=0;i<this.count;i++){
        if(data.Data[i].BACKGROUND_COLOR == "Darkslategray"){
          data.Data[i].textcolor = "white";
        }else if(data.Data[i].BACKGROUND_COLOR == "Green"){
          data.Data[i].textcolor = "white";
        }else{
          data.Data[i].textcolor = "black";
        }
      }
      this.sidenav.ShowSpinnerHandler(false);
      this.tables = data.Data;
    });
  }
  Table_Id : number;
  Selected_Amount : number;
  PromoCode : string;
  Selected_Kot : number;
  onbuttonclick($event,table_name,table_defination_id,BACKGROUND_COLOR)
  {
    if(BACKGROUND_COLOR == "Darkslategray")
    {
      this.sidenav.ShowSpinnerHandler(true);
      this.tname = table_name;
      this.table_defination_id = this.tname;
      this.service.getprintid(this.restaurent_id,this.table_defination_id).subscribe((data : Responce) =>
      {
        this.amount = data.Data[0].total_after_discount;
        this.table_defination_id = data.Data[0].table_defination_id;
      });
      this.service.gettabledata(this.restaurent_id).subscribe((data : Responce) =>
      {
        this.listcount = data.Data.length;
        for(let i = 1;i<=this.listcount;i++)
        {
            if(i == this.tname)
            {
              this.table_name = table_name;
              this.table_pax = data.Data[i-1].table_pax;
            }
        }
      });
      if(this.table_defination_id == 0 || this.table_defination_id == null)
      {
        this.Payment_disable = true;
        alert("please check the table definition id ");
      }
      else
      {
        this.print_disable = true;
        this.availOffer_disable = true;
        this.Payment_disable = false;
      }
      this.sidenav.ShowSpinnerHandler(false);
      this.Selected_Kot = 0;
    }
    else if(BACKGROUND_COLOR == "Green")
    {
      this.Selected_Kot = 0;
      this.print_disable = true;
      this.availOffer_disable = true;
      this.Payment_disable = true;
      this.dataSource = null;
      this.sidenav.ShowSpinnerHandler(false);
    }
    else if(BACKGROUND_COLOR == "Orange")
    {
      this.sidenav.ShowSpinnerHandler(true);
      this.tname = table_name;
      this.print_disable = false;
      this.availOffer_disable = false;
      this.Payment_disable = true;
      this.service.getorderitems(this.restaurent_id,this.tname).subscribe((data : Responce) =>
      {
          this.dataSource = data.Data;
          console.log(this.dataSource);
          this.listcount = data.Data.length;
          for(let i =0;i<this.listcount;i++)
          {
            this.totalamount = data.Data[i].order_totalamount;
            this.amount = this.amount + this.totalamount;
            this.Selected_Amount = this.amount;
          }
          this.Selected_Kot = data.Data[0].kot_id;
          this.table_name = this.tname;
          this.table_defination_id = this.tname;
          console.log(this.table_pax);
      });
      this.service.gettabledata(this.restaurent_id).subscribe((data : Responce) =>
      {
        this.listcount = data.Data.length;
        for(let i = 1;i<=this.listcount;i++)
        {
            if(i == this.tname)
            {
              this.table_name = table_name;
              this.table_pax = data.Data[i-1].table_pax;
            }
        }
      });
      this.sidenav.ShowSpinnerHandler(false);
    }
    this.amount = 0;
    this.tname = table_name;
    this.Table_Id = table_defination_id;
  }
  Parsing_data : ParsingData[];
  onsaveclick(){
    this.sidenav.ShowSpinnerHandler(true);
    if(this.tname == null || this.Table_Id == null ){
      alert("Please Select the Table..!");
      this.sidenav.ShowSpinnerHandler(false);
    }else{
      if(this.Selected_Kot == 0){
        alert("Please select the table Again..!");
      }else{
        if(this.Offer_Id == 0){
          this.OffId = null;
          this.AmountAfterDiscount = this.amount;
          this.ActualAmount = this.amount;
        }else{
          this.OffId = this.Offer_Id;
        }
        let date: Date = new Date();
        let print_data : Prints = {
          table_defination_id : this.Table_Id,
          total_amount : this.ActualAmount,
          offers_id : this.OffId,
          discount_amount : this.Discount_amount,
          print_status : "Printed",
          restaurent_id : this.restaurent_id,
          total_after_discount : this.AmountAfterDiscount,
          insert_by : "velsol",
          insert_date : this.datepipe.transform(date.toDateString(),'yyyy-MM-dd'),
          table_name : this.tname,
          kot_id : this.Selected_Kot,
        }
        //console.log(print_data);
        this.service.PrintInsert(print_data).subscribe((data : JsResponse) =>{
          this.sidenav.ShowSpinnerHandler(false);
          if(data.code == 200){
            alert(data.message);
            this.LoadingList();
            this.ClearList();
          }else{
            alert(data.message);
            this.LoadingList();
            this.ClearList();
          }
        })
      }
    }
  }
  ClearList(){
    this.amount = null;
    this.tname = null;
    this.dataSource = null;
    this.Discount_amount = null;
    this.ActualAmount = null;
    this.Table_Id = null;
    this.OffId = null;
    this.AmountAfterDiscount = null;
    this.Payment_disable = true;
    this.availOffer_disable = true;
    this.print_disable = true;
    this.tables_disable = false;
    this.offerappliedtext_disable = false;
  }
  Offer_Id : number = 0;
  OffId : number;
  Discount_amount : number = 0;
  AmountAfterDiscount : number;
  ActualAmount: number;
  onofferclick(): void{
    if(this.amount > 0){
      let p_data : ParsingData = {
        table_name : this.tname,
        total_amount : this.Selected_Amount,
        DiscountAmount : 0,
        AmountAfterDiscount : 0,
        OfferId : 0,
        Percentage : 0,
        MinBillAmount : 0,
        MaxDiscountAmount : 0,
        PromoCode : "",
      }
      const dialogRef = this.dialog.open(OffersDialogComponent, {
        data: p_data
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.amount = result.AmountAfterDiscount;
        this.Discount_amount = result.DiscountAmount;
        this.ActualAmount = result.total_amount;
        this.Offer_Id = result.OfferId;
        this.PromoCode = result.PromoCode;
        this.AmountAfterDiscount = result.AmountAfterDiscount;
        console.log(this.amount);
        if(this.Offer_Id == 0){
          this.tables_disable = false;
          this.offerappliedtext_disable = false;
        }else{
          this.tables_disable = true;
          this.offerappliedtext_disable = true;
        }
      });
    }else{
      alert("Please select the Occupied Table to apply an offer");
    }
  }
  public NavigateClick(table_name:number,table_pax:number,amount:number,table_defination_id:number,restaurent_id:number)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "tablename":this.table_name = table_name, 
        "pax":this.table_pax = table_pax,
        "amount":this.amount= amount,
        "tid":this.table_defination_id= table_defination_id,
        "resid":this.restaurent_id= restaurent_id,
      }
    };
    console.log("name",this.table_name);console.log("pax",this.table_pax);console.log("amount",this.amount);
    this.router.navigate(['Home/BillPayment'],navigationExtras); 
  }
}