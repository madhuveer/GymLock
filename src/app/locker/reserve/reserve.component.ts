import { Component, OnInit } from '@angular/core';
import { Locker } from './../../locker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  

  totalLockerCount:number=15;
  lockers:Locker[] = [];
  selectedLocker=-1;
  nextLocker=-1;

  constructor(private toastr: ToastrService){ }
   
  ngOnInit(): void {
  
    for(let i=1;i<=this.totalLockerCount;i++)
    {
    let lockerObj:Locker={
      lockerId: i,
      status: "free",
      msg: "free"
    };
this.lockers.push(lockerObj);
    }
  }

  resrveLocker(  lockerSelected:boolean)
  {
    if(this.selectedLocker==-1)
    lockerSelected=    this.allotLockerAtStart(lockerSelected);
    else
    lockerSelected=  this. allotLockerIfAvailable(lockerSelected); 

if(!lockerSelected)
  this.toastr.error("Sorry , no locker can be alloted now");
  }

  setLockInfo(locker:Locker,msg:string,status:string)
  {
    locker.status=status;
    locker.msg=msg;
  }

  allotLockerAtStart(lockerSelected:boolean)
  {
    this.selectedLocker++;
    this.setLockInfo( this.lockers[this.selectedLocker],"Busy",'busy');
    this.nextLocker=this.selectedLocker+2;
   let locker= this.lockers[this.nextLocker];
   this.setLockInfo(locker,"will be the next reserved one","next");
   lockerSelected=true;
   this.toastr.success("Hello, Locker No."+ this.lockers[this.selectedLocker].lockerId+" alloted");
   this.toastr.warning("Hello,"+locker.lockerId+" will be the next reserved one");
   return lockerSelected;
  }

  allotLockerIfAvailable(lockerSelected:boolean)
  {
    if(this.nextLocker<this.lockers.length)
    {
      let locker=this.lockers[this.nextLocker];
      if(locker.status==='next'&&!lockerSelected)
      {
         this.setLockInfo(locker,"Busy",'busy');
        lockerSelected=true;
        this.selectedLocker=  this.nextLocker;
        this.toastr.success("Hello, Locker No."+locker.lockerId+" alloted");
      }
      if(lockerSelected&&(this.nextLocker+2)<this.lockers.length)
      {
        this.nextLocker=this.selectedLocker+2;
        locker=this.lockers[this.nextLocker];
        this.setLockInfo(locker,"will be the next reserved one","next");
        this.toastr.warning("Hello,"+(locker.lockerId)+" will be the next reserved one");
      }  

    }
    return lockerSelected;
  }

  
  
}
