import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Property } from 'src/app/shared/property';
import { Apiresponse } from 'src/app/shared/apiresponse';
import { Data } from 'src/app/shared/data';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';
import { JsResponse } from '../../shared/js-response';
import { FormControl } from '@angular/forms';
import { SidenavToolbarComponent } from 'src/app/ui/sidenav-toolbar/sidenav-toolbar.component';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
   buttoncontent:string; property_id : number;  property_name : string;   property_address : string;
   property_mobile_no : number;   property_land_mark : string;   property_landline : number;
   property_city : string;   property_email : string;   property_state : string;
   property_website : string;   property_pincode : number;   property_gst : string;
   property_country : string;   propertylist : Apiresponse;  propertydata : Data[];
   jsRes : JsResponse;
  constructor(private service1: RestaurantService,public sidenav : SidenavToolbarComponent) { }

  ngOnInit() {  
    this.sidenav.ShowSpinnerHandler(true);
    this.buttoncontent = "Save";
    this.service1.getproperty().subscribe((data: Apiresponse) => 
    {
      if(data.Data[0].property_name == "")
      { this.buttoncontent = "Save"; }
      else 
      { this.buttoncontent = "Modify";}
      this.property_name = data.Data[0].property_name;
      this.property_address = data.Data[0].property_address;
      this.property_city = data.Data[0].property_city;
      this.property_country = data.Data[0].property_country;
      this.property_email = data.Data[0].property_email;
      this.property_gst = data.Data[0].property_gst;
      this.property_land_mark = data.Data[0].property_land_mark;
      this.property_landline = data.Data[0].property_landline;
      this.property_mobile_no = data.Data[0].property_mobile_no;
      this.property_pincode = data.Data[0].property_pincode;
      this.property_state = data.Data[0].property_state;
      this.property_website = data.Data[0].property_website;
     });
     this.sidenav.ShowSpinnerHandler(false);

    // if(this.property_name=="" && this.property_address=="" && this.property_land_mark=="" && this.property_city=="" && this.property_state=="" &&
    // this.property_pincode==null && this.property_country=="" && this.property_mobile_no==null && this.property_landline==null && this.property_email=="" && this.property_website=="" && this.property_gst=="")
    // {
    //   this.buttoncontent = "Save";
    // }
    // else
    // {
    //   this.buttoncontent = "Modify";
    // }
  }
  public onsave()
  {
    this.sidenav.ShowSpinnerHandler(true);
    if(this.buttoncontent == "Save")
    {
      let a: Property = {
        property_id : this.property_id,
        property_name : this.property_name,
        property_address : this.property_address,
        property_mobile_no : this.property_mobile_no,
        property_land_mark : this.property_land_mark,
        property_landline : this.property_landline,
        property_city : this.property_city,
        property_email : this.property_email,
        property_state : this.property_state,
        property_website : this.property_website,
        property_pincode : this.property_pincode,
        property_gst : this.property_gst,
        property_country : this.property_country
      }
      this.service1.createproperty(a).subscribe((data: JsResponse) => 
      {
        this.jsRes = data;
        this.sidenav.ShowSpinnerHandler(false);
            if(this.jsRes.code==200)
            {alert("Property Added Succesfully.!");}
            else{alert("Failed to insert data");}
    });
  }
    else if(this.buttoncontent == "Modify")
    {
      let a: Property = {
        property_id : 1,
        property_name : this.property_name,
        property_address : this.property_address,
        property_mobile_no : this.property_mobile_no,
        property_land_mark : this.property_land_mark,
        property_landline : this.property_landline,
        property_city : this.property_city,
        property_email : this.property_email,
        property_state : this.property_state,
        property_website : this.property_website,
        property_pincode : this.property_pincode,
        property_gst : this.property_gst,
        property_country : this.property_country
      }
      this.service1.updateproperty(a).subscribe((data: JsResponse) => 
      {
        this.jsRes = data;
        this.sidenav.ShowSpinnerHandler(false);
        if(this.jsRes.code==200)
        {alert("Property Updated Succesfully.!");}
        else{alert("Failed to update data");}
    });
    }
    console.log(this.property_name);console.log(this.property_address);console.log(this.property_mobile_no);console.log(this.property_land_mark);
      console.log(this.property_landline);console.log(this.property_city);console.log(this.property_email);console.log(this.property_state);
      console.log(this.property_website);console.log(this.property_pincode);console.log(this.property_gst);console.log(this.property_country);
  }
}