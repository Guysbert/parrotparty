import { Component, OnInit } from '@angular/core';
import { Parrot } from './parrot';
import { ParrotService } from './parrots.service';

@Component({
  selector: 'parrotselector',
  templateUrl: 'app/parrotselector.component.html',
  styleUrls: ['app/parrotselector.component.css']
})
export class ParrotSelector implements OnInit {
      public parrots: Parrot[];
        
      constructor(private parrotService: ParrotService){}

      ngOnInit(){
            this.parrots = this.parrotService.getParrots();
      }
       
      isParrotSelected(parrot:Parrot):boolean{
        if (this.parrotService.getSelectedParrot()){
          return parrot.id === this.parrotService.getSelectedParrot().id;
        }
        return false;        
      }

       selectParrot(id: number) {
        this.parrotService.setSelectedParrot(this.parrots.find(parrot => parrot.id === id))
      }
}