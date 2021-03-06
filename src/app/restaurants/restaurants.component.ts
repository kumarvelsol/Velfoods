import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant/restaurant.service';
import { Apiresponse } from '../shared/apiresponse';
import { MatTableDataSource } from '@angular/material';
import { Restaurant } from '../shared/interfaces/restaurant';
import { JsResponse } from '../shared/js-response';
import { Data } from '@angular/router';
import { SidenavToolbarComponent } from '../ui/sidenav-toolbar/sidenav-toolbar.component';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  constructor(public service:RestaurantService,public sidenav : SidenavToolbarComponent ) { }
  restodatalist:Apiresponse;managerslist:Data[]; buttoncontent:string;
  restaurent_id:number;restaurent_name:string;restaurent_mobile_no:string;
  restrent_manger:string;restaruent_status:string;restaurent_address:string;
  manger_name:string;
  dataSource;jsRes :JsResponse;
  displayedColumns: string[] = ['restaurent_id', 'restaurent_name','restaurent_address', 'restaurent_mobile_no','restrent_manger','restaruent_status','actions'];
  ngOnInit() {
    this.buttoncontent = "Save";
    this.sidenav.ShowSpinnerHandler(true);
    this.getrestos();
    this.service.getmanagers(1).subscribe((data:Apiresponse) =>{
      this.sidenav.ShowSpinnerHandler(false);
      this.managerslist = data.Data;
    });
  }
  getrestos()
  {
    this.service.getrestaurent(1).subscribe((data:Apiresponse)=> {
      this.sidenav.ShowSpinnerHandler(false);
      this.restodatalist = data;
      console.log(this.restodatalist);
      this.dataSource = new MatTableDataSource(this.restodatalist.Data);
    });
  }
  public onsubmitclick() 
  {
    this.sidenav.ShowSpinnerHandler(true);
    if(this.restaurent_name == "" || this.restaurent_mobile_no == "" || this.restaurent_address == "" || this.restaruent_status == "")
    {
      alert("Please fill all fields");
      this.sidenav.ShowSpinnerHandler(false);
    }
    else if(this.buttoncontent == "Save")
    {
        let a : Restaurant = {
          restaurent_id : this.restaurent_id,
          restaurent_name : this.restaurent_name,
          restaurent_mobile_no : this.restaurent_mobile_no,
          restrent_manger : this.manger_name,
          restaurent_address : this.restaurent_address,
          restaruent_status : this.restaruent_status
        }
        this.service.addrestaurant(a).subscribe((data : JsResponse) => {
          this.jsRes = data;
          this.sidenav.ShowSpinnerHandler(false);
          if(this.jsRes.code==200)
          {
            alert("Restaurant Added Succesfully.!");
            this.onclearclick();
          }else{ alert("Failed to Insert data");}
       });
    }
    else if(this.buttoncontent == "Update")
    {
      let a : Restaurant = {
        restaurent_id : this.restaurent_id,
        restaurent_name : this.restaurent_name,
        restaurent_mobile_no : this.restaurent_mobile_no,
        restrent_manger : this.manger_name,
        restaurent_address : this.restaurent_address,
        restaruent_status : this.restaruent_status,
      }
      this.service.updaterestaurant(a).subscribe((data : JsResponse) => {
        this.jsRes = data;
        this.sidenav.ShowSpinnerHandler(false);
        if(this.jsRes.code==200)
        {
          alert("Restaurant updated Succesfully.!");
          this.onclearclick();
        }
        else{ alert("Failed to update data");}
      });
    }
  }
  public RowSelected(j,restaurent_id:number,restaurent_name:string,restaurent_address:string,restaurent_mobile_no:string,manger_name:string,restaruent_status:string)
  {
    this.buttoncontent = "Update";
    this.restaurent_id = restaurent_id;
    this.restaurent_name = restaurent_name;
    this.restaurent_address = restaurent_address;
    this.restaurent_mobile_no = restaurent_mobile_no;
    this.manger_name = manger_name;
    console.log(this.manger_name);
    this.restaruent_status = restaruent_status;
  }
  public onclearclick()
  {
    this.buttoncontent = "Save";
    this.restaurent_name="";
    this.restaurent_mobile_no="";
    this.restaurent_address="";
    this.restaruent_status="";
    this.manger_name="";
    this.getrestos();
  }
}
