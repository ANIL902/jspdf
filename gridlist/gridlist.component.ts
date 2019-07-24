import { Component, OnInit } from '@angular/core';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
// var fs = require('fs');
// import * as jsPDF from 'jspdf'; 
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

// import 'jspdf-autotable';
declare let jsPDF:any;




export interface body{
  Sno:number;
  name:string;
  marks:number;
  percentage:number;
}
export interface title{
  Sno:number;
  name:string;
  marks:number;
  percentage:number;
}


@Component({
  selector: 'app-gridlist',
  templateUrl: './gridlist.component.html',
  styleUrls: ['./gridlist.component.css']
})
export class GridlistComponent implements OnInit {
 
  invalid:boolean=false;
 
  tittles:title[]=[
    { Sno:1, name:"Bhavyajhfdhdhdudhusd",marks:65, percentage:65},
    { Sno:2, name:"Anil", marks:75,  percentage:75 },
    { Sno:3, name:"Naresh",marks:85, percentage:85 },
    { Sno:4,name:"Naveen", marks:95, percentage:95}
  ]
  bodies:body[]=[
    { Sno:1, name:"Bhavya",marks:65, percentage:65},
    { Sno:2, name:"Anil", marks:75,  percentage:75 },
    { Sno:3, name:"Naresh",marks:85, percentage:85 },
    { Sno:4,name:"Naveen", marks:95, percentage:95}
  ];
//  head=['Sno','name','marks','percentage'];
// bodies:title[];

head=['Sno','name','marks','percentage'];
 columns=['Sno','name','marks','percentage'];
 body=[];
 datasource;
  
  
  

 

  constructor(private snackBar: MatSnackBar,private translate: TranslateService) {

    
    // this.fetch_userdata();
    // translate.addLangs(['en', 'fr','ar']);
    translate.setDefaultLang('en');

    // const browserLang: string = translate.getBrowserLang();
    // translate.setDefaultLang('en');
    // translate.use(browserLang.match(/en|ar/) ? browserLang : 'en')
   }
  //  fetch_userdata(){
  //   this.datasource= this.myservices.getuserdata().subscribe((bodies:title[])=>{
  //      this.bodies=bodies;
  //      this.datasource=new MatTableDataSource(bodies);
  //      this.datasource.paginator = this.paginator;
  //      this.datasource.sort=this.sort;
  //   });
  // }

   convertdata(lang){
    this.translate.use(lang)
  }
  //  convertdata(lang){
  //   this.convertdata.use(lang)

  // }


  ngOnInit() {
    
  }
  // converten(lang){
  //   this.translates.use(lang);
  // }
  ExportTOExcel() {
    if(this.columns.length>=4){
      this.columns.forEach(x=>{console.log("excel=>",x)
        if(x.length>15){
          this.invalid=true
        }
        else{
          console.log("invaliddata",this.invalid)
        }
      })
      this.openSnackBar('tabledatalenth','succes','blue-snackbarr')
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tittles.map(data=> _.pick(data, this.columns)));
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      console.log(ws)
      console.log("data3=>",wb)
      XLSX.writeFile(wb, "excel.xlsx");
     
  
      // console.log(this.invalid)
      // else{
      //   this.openSnackBar('nodata','error','red-snackbar')

      // }
      // if(this.columns.name>15){
      //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tittles.map(data=> _.pick(data, this.columns)));
      //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
      //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      //   console.log(ws)
    
     
      //   XLSX.writeFile(wb, "excel.xlsx");

      // }
     
    }
    else{
      this.openSnackBar('nodata','error','red-snackbar')
    }

    // else{
    //   this.openSnackBar('nodata','error','red-snackbar')
    // }
    // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tittles.map(data=> _.pick(data, this.columns)));
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // console.log(ws)

 
    // XLSX.writeFile(wb, "excel.xlsx");
  }
  ExportTOCsv() {
    console.log("this.menuInfo", this.tittles[0]);
    console.log("this.menuInfo", Object.keys(this.tittles[0]));
    var options = {
      noDownload: false,
      headers: this.columns,
    };
    new AngularCsv(this.tittles.map(data=> _.pick(data, this.columns)), "LiveReports",options);
  }
  
  ExportToPdf(){
      const doc = new jsPDF();
    
      this.bodies.forEach(x=>{
      var temp = [x.Sno,x.name,x.marks,x.percentage];
      this.body.push(temp)
      console.log("temp=>",temp)
      });
      this.head.forEach(x=>{
        console.log("x",x);
        x=x.replace(x,this.translate.instant('data.'+x)) ;
        console.log("x1",x);
        console.log("headers=>",this.head);
        // this.translate.use()
        
        })
    //  doc.text('لأسم انجليزي',10,10,{lang:'ar'})
     doc.autoTable({head:[this.head],body:this.body,lang:'ar'
      // head: [['Name', 'Email', 'Country']],
      // body: [
      //     ['David', 'david@example.com', 'Sweden'],
      //     ['Castille', 'castille@example.com', 'Norway'],
      //     // ...
      // ]
    })
  
    // doc.text('text',10,10)
 
    // doc.save('table.pdf');
// let rowData = [];
//     let data = [
//       {'Name':'David','Email':'david@example.com', 'Country':'Sweden'},{'Name':'Castille','Email':'castille@example.com','Country':'Norway'}
//     ];
//     data.forEach(x=>{
//       let temp = [x.Name,x.Email,x.Country];
//       rowData.push(temp);
//     });
//     var doc =new jsPDF('p', 'pt');
//     doc.autoTable({
//         head: [['Name', 'Email', 'Country']],
//         body:  rowData
//     });
doc.save('griddata-report.pdf')
  
  }

openSnackBar(message: string, action: string, className:string) {
  this.snackBar.open(message, action, {
    duration: 2000,
    panelClass: [className]
  });
} 

}

