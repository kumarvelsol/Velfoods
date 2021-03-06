import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant/restaurant.service';
import { itemnames } from '../shared/interfaces/empcate';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SidenavToolbarComponent } from '../ui/sidenav-toolbar/sidenav-toolbar.component';

@Component({
  selector: 'app-item-names',
  templateUrl: './item-names.component.html',
  styleUrls: ['./item-names.component.css']
})
export class ItemNamesComponent implements OnInit 
{
    itemname_id:number;
    itemname_item_name:string;
    itemname_description:string;
    itemname_reportingname:string;
    itemname_active_from:Date;
    itemname_status:string;
    item_dinein_amount:number;
    item_dinein_tax:number;
    item_takeaway_amount:number;
    item_takeaway_tax:number;
    item_homedelivary_amount:number;
    item_homedelivary_tax:number;
    item_homedelivery_deliverycharges:number;
    restaurent_id :number;
    itemcategory_id:number;
    itemname_dinein_total:string;
    itemname_takeaway_total:string;
    itemname_homedelivary_total:string;
    dataSource; tax_percentage : number;
    buttoncontent:string; itemcategory; taxlist; 
    takeaway_tax_percentage : number; dinein_tax_percentage : number; hd_tax_percentage : number;
    emplist;empregistration_name : string; item_name : string;
    constructor(public service:RestaurantService,public route : ActivatedRoute,public sidenav :SidenavToolbarComponent) { 
      this.route.queryParams.subscribe(params =>
        {
          this.restaurent_id = LoginComponent.rid;
        })
    }
  displayedColumns: string[] = ['itemname_id', 'itemname_item_name', 'itemname_reportingname','item_dinein_amount','item_dinein_tax','item_takeaway_amount','item_takeaway_tax','item_homedelivary_amount','item_homedelivary_tax','item_homedelivery_deliverycharges', 'itemname_status','actions'];
  ngOnInit() 
  {
    this.sidenav.ShowSpinnerHandler(true);
    this.buttoncontent ="Save";
    this.service.getitemnames(this.restaurent_id).subscribe(data =>
      {
        this.dataSource = data.Data;
      });
      this.service.getitemcate(this.restaurent_id).subscribe(data =>
        {
          this.itemcategory = data.Data;
        });
        this.service.TaxList(this.restaurent_id).subscribe(data =>
          {
            this.taxlist = data.Data;
          });
          this.service.getempreg(this.restaurent_id).subscribe(data =>
            {
              this.emplist = data.Data;
            });
            this.sidenav.ShowSpinnerHandler(false);
  }
  onsaveclick(){
    this.sidenav.ShowSpinnerHandler(true);
    let itmname: itemnames ={
      itemname_id:this.itemname_id,
      itemname_item_name:this.itemname_item_name,
      itemname_description:this.itemname_description,
      itemname_reportingname:this.itemname_reportingname,
      itemname_active_from:this.itemname_active_from,
      itemname_status:this.itemname_status,
      item_dinein_amount:this.item_dinein_amount,
      item_dinein_tax:this.dinein_tax_percentage,
      item_takeaway_amount:this.item_takeaway_amount,
      item_takeaway_tax:this.takeaway_tax_percentage,
      item_homedelivary_amount:this.item_homedelivary_amount,
      item_homedelivary_tax:this.hd_tax_percentage,
      item_homedelivery_deliverycharges:this.item_homedelivery_deliverycharges,
      restaurent_id:this.restaurent_id,
      itemcategory_id:this.itemcategory_id,
      itemname_dinein_total:this.itemname_dinein_total,
      itemname_takeaway_total:this.itemname_takeaway_total,
      itemname_homedelivary_total:this.itemname_homedelivary_total
    }
    if(this.buttoncontent =="Save")
    {
      this.service.additemname(itmname).subscribe(data =>{
        this.sidenav.ShowSpinnerHandler(false);
        if(data.code ==200){
          alert(data.message);
          
          this.onclearclick();
          this.ngOnInit();
        }
        else
        {
          this.sidenav.ShowSpinnerHandler(false);
          alert(data.message);
          
          this.onclearclick();
          this.ngOnInit();
        }
      });
    }    
    else
    {
      this.service.updateitemname(itmname).subscribe(data =>{
        this.sidenav.ShowSpinnerHandler(false);
        if(data.code ==200){
          alert(data.message);
          this.ngOnInit();
          this.onclearclick();
        }
        else
        {
          this.sidenav.ShowSpinnerHandler(false);
          alert(data.message);
          this.ngOnInit();
          this.onclearclick();
        }
      });
    }
  }
  onclearclick()
  {
    this.itemname_id=Number("");
    this.itemname_item_name="";
    this.itemname_description="";
    this.itemname_reportingname="";
    this.empregistration_name = "";
    this.itemname_status="";
    this.item_dinein_amount=Number("");
    this.item_dinein_tax=Number("");
    this.item_takeaway_amount=Number("");
    this.item_takeaway_tax=Number("");
    this.item_homedelivary_amount=Number("");
    this.item_homedelivary_tax=Number("");
    this.item_homedelivery_deliverycharges=Number("");
    this.itemcategory_id=Number("");
    this.itemname_dinein_total="";
    this.itemname_takeaway_total="";
    this.itemname_homedelivary_total="";
    this.buttoncontent ="Save";
  }
  onchange(){
    function change($scope) {
      $scope.total = function () 
      {
        return parseInt($scope.item_dinein_amount) * parseInt($scope.dinein_tax_percentage)/100 + parseInt($scope.item_dinein_amount);
      };
      console.log(parseInt($scope.item_dinein_amount) * parseInt($scope.dinein_tax_percentage)/100 + parseInt($scope.item_dinein_amount));
  }
}
  onchangee(){
    function change($scope) {
      $scope.total = function () 
      {
        return parseInt($scope.item_takeaway_amount) * parseInt($scope.takeaway_tax_percentage)/100 + parseInt($scope.item_takeaway_amount);
      };
      console.log(parseInt($scope.item_takeaway_amount) * parseInt($scope.takeaway_tax_percentage)/100 + parseInt($scope.item_takeaway_amount));
  }
}
onchangeee(){
  function change($scope) {
    $scope.total = function () 
    {
      return parseInt($scope.item_homedelivary_amount) * parseInt($scope.hd_tax_percentage)/100 + parseInt($scope.item_homedelivary_amount);
    };
    console.log(parseInt($scope.item_homedelivary_amount) * parseInt($scope.hd_tax_percentage)/100 + parseInt($scope.item_homedelivary_amount));
} 
}

  public RowSelected(i:number,
    itemname_id:number,
    itemname_item_name:string,itemname_description:string,itemname_reportingname:string,itemname_active_from:Date,
    item_dinein_amount:number,item_dinein_tax:number,itemname_dinein_total:string,
    item_takeaway_amount:number,item_takeaway_tax:number,itemname_takeaway_total:string,
    item_homedelivary_amount:number,item_homedelivary_tax:number,
    item_homedelivery_deliverycharges:number,itemname_homedelivary_total:string,
    itemname_status:string,itemcategory_id:number)
  {
    this.buttoncontent ="Update";
    this.itemname_id = itemname_id;
    this.itemname_item_name =itemname_item_name;
    this.itemname_description =itemname_description;
    this.itemname_reportingname =itemname_reportingname;
    this.itemname_active_from =itemname_active_from;
    this.item_dinein_amount =item_dinein_amount;
    this.dinein_tax_percentage =item_dinein_tax;
    this.itemname_dinein_total =itemname_dinein_total;
    this.item_takeaway_amount =item_takeaway_amount;
    this.takeaway_tax_percentage =item_takeaway_tax;
    this.itemname_takeaway_total =itemname_takeaway_total;
    this.item_homedelivary_amount =item_homedelivary_amount;
    this.hd_tax_percentage  =item_homedelivary_tax;
    this.item_homedelivery_deliverycharges =item_homedelivery_deliverycharges;
    this.itemname_homedelivary_total =itemname_homedelivary_total;
    this.itemname_status =itemname_status;
    this.itemcategory_id = itemcategory_id;

  }
}

