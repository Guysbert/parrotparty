import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {    
    private userWidth:number = 5;
    private userHeigth:number = 5;

    getUserWidth():number {
        return this.userWidth;
    }

    getUserHeigth():number {
        return this.userHeigth;
    }

    setUserWidth(width:number) {
        this.userWidth = width;
    }

    setUserHeigth(heigth:number) {
        this.userHeigth = heigth;
    }
}
