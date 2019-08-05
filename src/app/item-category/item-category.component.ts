import { Component, OnInit } from '@angular/core';
import { ItemcategoryServiceService } from '../itemcategory-service.service';
import { NgForm } from '@angular/forms';
import { RestaurantService } from '../restaurant/restaurant.service';
import { itemcategory } from '../shared/interfaces/empcate';
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css']
})
export class ItemCategoryComponent implements OnInit {
  buttoncontent:string;
  itemcategory_id:number;
  item_name:string;
  item_description:string;
  item_active_from:Date;
  item_status:string;
  item_reporting_name:string;
  restaurent_id:number;
  constructor(public service:RestaurantService) { }  
  displayedColumns: string[] = ['itemcategory_id', 'item_name', 'item_reporting_name', 'item_status','actions'];
  dataSource;
  ngOnInit() {
    this.buttoncontent ="Save";
    this.service.getitemcate(1).subscribe(data =>
      {
        this.dataSource = data.Data;
      });
  }
  onsaveclick(){
    let item:itemcategory ={
      itemcategory_id:this.itemcategory_id,
      item_name:this.item_name,
      item_description:this.item_description,
      item_active_from:this.item_active_from,
      item_status:this.item_status,
      item_reporting_name:this.item_reporting_name,
      restaurent_id:1
    }
    if(this.buttoncontent =="Save"){
      this.service.additemca(item).subscribe(data =>{
        if(data.code ==200){
          alert(data.message);
          this.ngOnInit();
          this.onclearclick();
        }
        else
        {
          alert(data.message);
          this.ngOnInit();
          this.onclearclick();
        }
      });
    }
    else
    {
      this.service.updateitemca(item).subscribe(data =>{
        if(data.code ==200){
          alert(data.message);
          this.ngOnInit();
          this.onclearclick();
        }
        else
        {
          alert(data.message);
          this.ngOnInit();
          this.onclearclick();
        }
      });
    }
  }
  
  onclearclick(){
    this.itemcategory_id =Number("");
    this.item_name ="";
    this.item_description  ="";
    this.item_status ="";
    this.item_reporting_name ="";
  }
  public RowSelected(i:number,itemcategory_id:number,item_name:string,item_description:string,item_status:string,item_reporting_name:string,item_active_from:Date)
  {
    this.buttoncontent ="Update";
    this.itemcategory_id =itemcategory_id,
    this.item_name =item_name,
    this.item_description=item_description,
    this.item_status =item_status,
    this.item_reporting_name =item_reporting_name,
    this.item_active_from = item_active_from
  }
}