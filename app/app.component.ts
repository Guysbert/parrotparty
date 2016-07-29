import { Component, OnInit, OnDestroy } from '@angular/core';
import { PARROTS } from './parrots';
import { Parrot } from './parrot';
import { ParrotService} from './parrots.service';
import { ParrotSelector } from './parrotselector/parrotselector.component';
import { SettingsService } from './settings.service';

const templateUrl = require('./app.component.html');

@Component({
  selector: 'my-app',
  templateUrl: templateUrl,
  styleUrls: ['app/app.component.css'],
  directives: [ParrotSelector],
  providers: [ParrotService, SettingsService]
})
export class AppComponent implements OnInit {
  public grid: Grid;
  public displayGrid: boolean;
  public slackString: string;
  public drawingMode: boolean;
  private currentCell: Cell;
  userWidth:number;
  userHeigth:number;
  
  private static PARROT_SPACER: string = '         ';

  constructor(private parrotService: ParrotService, private settingsService: SettingsService) { 

  }

  ngOnInit() {
    this.displayGrid = true;
    this.grid = new Grid(this.settingsService.getUserWidth(), this.settingsService.getUserHeigth());
    this.userHeigth = 5;
    this.userWidth = 5;
  }
  setUserWidth(userWidth) {
        this.userWidth = userWidth;
    }

    setUserHeigth(userHeight) {
        this.userHeigth = userHeight;
    }

  setGridSize(width, height){
    this.grid = new Grid(height, width);
  }


  disableDrawingModeIfMouseUp($event) {
    if ($event.buttons === 0) {
      this.drawingMode = false;
    }
  }

  enterDrawingMode($event) {
    $event.preventDefault();
    this.drawingMode = true;
  }

  exitDrawingMode($event) {
    $event.preventDefault();
    this.drawingMode = false;
  }





  getRows() {
    return this.grid.rowsAndColums;
  }

  cellDrag(row, col) {
    let cell = this.grid.getCell(row, col);
    if (this.parrotService.getSelectedParrot && cell != this.currentCell && this.drawingMode) {
      this.toggleParrot(row, col, cell);
    }
  }

  cellClick(row, col) {
    this.toggleParrot(row, col, undefined);
  }

  private toggleParrot(row, col, cell) {
    if (this.grid.getParrot(row, col) != this.parrotService.getSelectedParrot()) {
      this.grid.setParrot(row, col, this.parrotService.getSelectedParrot());
    } else {
      this.grid.setParrot(row, col, undefined);
    }
    this.currentCell = cell;
  }

  createSlackString() {
    this.slackString = "";
    for (let y = 0; y < this.grid.getHeigth(); y++) {
      for (let x = 0; x < this.grid.getWidth(); x++) {
        let parrot: Parrot = this.grid.getParrot(x, y);
        if (parrot) {
          this.slackString = this.slackString + ':' + parrot.name + ':';
        } else {
          this.slackString = this.slackString + AppComponent.PARROT_SPACER;
        }
      }
      this.slackString = this.slackString + "\n";
    }
  }
}



export class Grid {
  rowsAndColums: Cell[][];
  constructor(rows: number, cols: number) {
    this.rowsAndColums = [];
    for (let x = 0; x < rows; x++) {
      let row: Cell[] = [];
      for (let y = 0; y < cols; y++) {
        let cell = new Cell(x, y);
        row.push(cell);
      }
      this.rowsAndColums.push(row);
    }
  }

  getCell(row: number, col: number) {
    return this.rowsAndColums[col][row];
  }

  setParrot(row: number, col: number, parrot: Parrot) {
    this.rowsAndColums[col][row].parrot = parrot;
  }
  getParrot(row: number, col: number): Parrot {
    return this.rowsAndColums[col][row].parrot;
  }
  getHeigth(): number {
    return this.rowsAndColums.length;
  }
  getWidth(): number {
    return this.rowsAndColums[0].length;
  }


}

export class Cell {
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }
  row: number;
  col: number;
  parrot: Parrot;
}