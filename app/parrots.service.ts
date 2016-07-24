import { Injectable } from '@angular/core';
import { PARROTS } from './parrots';
import { Parrot } from './parrot';


@Injectable()
export class ParrotService {
    private selectedParrot:Parrot;

    setSelectedParrot(parrot:Parrot){
        this.selectedParrot = parrot;
    }

    getSelectedParrot():Parrot {
        return this.selectedParrot;
    }

    getParrots(){
        return PARROTS;
    }
}
