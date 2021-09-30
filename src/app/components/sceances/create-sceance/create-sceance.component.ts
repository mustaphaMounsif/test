import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pov } from 'src/app/models/pov';
import { Sceance } from 'src/app/models/sceance';
import { PovService } from 'src/app/services/pov.service';
import { SceanceService } from 'src/app/services/sceance.service';

@Component({
  selector: 'app-create-sceance',
  templateUrl: './create-sceance.component.html',
  styleUrls: ['./create-sceance.component.css']
})
export class CreateSceanceComponent implements OnInit {

  sceance:Sceance=new Sceance();
  povs:Pov[]; 

  constructor(private sceanceService:SceanceService,
              private povService:PovService,
              private router:Router,
              protected ref:MatDialogRef<CreateSceanceComponent>
              ) { }

  ngOnInit(): void {
    this.getPovs();
  }

  private getPovs(){
    this.povService.getPovList().subscribe(data=>{
      this.povs=data;
    })

  }

  saveSceance(){
    this.sceanceService.createSceance(this.sceance).subscribe(data=>{
      this.goToSceanceList();
      let currentUrl=this.router.url;
      this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
        this.router.navigate([currentUrl]);
      });
    },
   error=>console.log(error) 
    );
    this.ref.close();
  }

  goToSceanceList(){
    this.router.navigate(['/sceances']);
  }
  onSubmit(){
    this.saveSceance();
  }

}
