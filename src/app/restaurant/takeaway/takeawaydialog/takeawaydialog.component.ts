import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RestaurantService } from '../../restaurant.service';
import { Data, ActivatedRoute } from '@angular/router';
import { Responce } from 'src/app/shared/js-response';
import { LoginComponent } from 'src/app/login/login.component';

export interface UsersData {
  order_itemname:string;
  itemname_id:number;
  order_quantity:number;
  order_rate:number;
  order_id:number;
  order_totalamount:number;
  order_tax_amount:number;
}

@Component({
  selector: 'app-takeawaydialog',
  templateUrl: './takeawaydialog.component.html',
  styleUrls: ['./takeawaydialog.component.css']
})
export class TakeawaydialogComponent implements OnInit {
  action:string;itemnames:Data[];itemctg:Data[];order_itemname:string;orderlist:Responce;
  local_data:any;order_quantity:number;order_id:number=0;order_rate:number;order_totalamount:number=0;
  order_tax:number;disable:boolean=false;restaurent_id:number;itemcategory_id:number;

  constructor(public dialogRef: MatDialogRef<TakeawaydialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData, public service:RestaurantService,private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
        this.restaurent_id = LoginComponent.rid;
      });
      console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
    this.order_itemname = this.local_data.order_itemname;
    this.order_quantity = this.local_data.order_quantity;
     }

  ngOnInit() {
    if(this.action == "Update")
    {
      this.disable = true;
    }
    this.service.getitemcate(this.restaurent_id).subscribe((data:Responce) =>{
      this.itemctg = data.Data;
    });
  }
  onnameChange() {  
    console.log(this.data.order_itemname);
    this.service.getitemnameswithcat(this.restaurent_id,this.itemcategory_id).subscribe((data:Responce)=> {
      this.orderlist = data;
      for(let i=0;i<this.orderlist.Data.length;i++)
      {
        if(this.orderlist.Data[i].itemname_item_name == this.data.order_itemname)
        {
          this.data.itemname_id = this.orderlist.Data[i].itemname_id;
          this.data.order_rate = this.orderlist.Data[i].item_takeaway_amount;
          this.data.order_tax_amount = this.orderlist.Data[i].item_takeaway_tax;
          console.log(this.data.order_rate,this.data.order_tax_amount);
          break;
        }
      }
    });
  }
  oncatChange()
  {
    this.service.getitemnameswithcat(this.restaurent_id,this.itemcategory_id).subscribe((data:Responce)=> {
      this.itemnames = data.Data;
    });
  }
  totalwotax:number;
  onChangeQuantity()
  {
    //this.data.order_id = ++this.order_id;
    this.totalwotax = this.data.order_rate * this.data.order_quantity;
    this.data.order_totalamount = (this.totalwotax * (this.data.order_tax_amount/100)) + this.totalwotax;
    console.log(this.data.order_totalamount);
  }
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
