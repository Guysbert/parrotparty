import { Component, OnInit } from '@angular/core';
import { PARROTS } from './parrots';
import { Parrot } from './parrot';




@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})
export class AppComponent implements OnInit {
  public parrots: Parrot[];
  public selectedParrot: Parrot;
  public grid: Grid;
  public displayGrid: boolean;
  public slackString: string;
  public userWidth:number;
  public userHeight:number;
  public drawingMode:boolean;
  private currentCell:Cell;

  private static PARROT_SPACER:string = '         ';
  private static INITIAL_WIDTH:number = 5;
  private static INITIAL_HEIGHT:number = 5;

  ngOnInit() {
    this.displayGrid = true;
    this.parrots = PARROTS;
    this.grid = new Grid(AppComponent.INITIAL_WIDTH, AppComponent.INITIAL_HEIGHT);
    this.userWidth = AppComponent.INITIAL_WIDTH;
    this.userHeight = AppComponent.INITIAL_HEIGHT;
  }

  setGridSize(userWidth, userHeight) {
    if (this.inputIsValid(userWidth, userHeight)) {
      this.grid = new Grid(userHeight, userWidth);
    }
  }

  private inputIsValid(userWidth, userHeight){
    let valid = true;
    if (isNaN(parseInt(userWidth))) {
      console.log('width is not a number');
      valid = false;      
    }
    if (isNaN(parseInt(userHeight))) {
      console.log('heigth is not a number');
      valid = false;      
    }
    return valid;
  }

  enterDrawingMode($event){
    $event.preventDefault();
    this.drawingMode = true;    
  }

  exitDrawingMode($event){
    $event.preventDefault();
    this.drawingMode = false;
  }

  updateUserWidth(userWidth){
    this.userWidth = userWidth;
  }

  updateUserHeigth(userHeight){
    this.userHeight = userHeight;
  }

  selectParrot(id: number) {
    this.selectedParrot = this.parrots.find(parrot => parrot.id === id);
    console.log(id);
  }

  getRows() {
    return this.grid.rowsAndColums;
  }

  cellDrag(row,col){
    let cell = this.grid.getCell(row, col);
    if (this.selectedParrot && cell != this.currentCell && this.drawingMode) {
      this.toggleParrot(row, col, cell);
    }
  }

  cellClick(row, col) {
    this.toggleParrot(row, col, undefined);
  }

  private toggleParrot(row, col, cell){
    if (this.grid.getParrot(row, col) != this.selectedParrot) {
        this.grid.setParrot(row, col, this.selectedParrot);
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

  getCell(row:number, col:number){
    return this.rowsAndColums[col][row];
  }

  setParrot(row: number, col: number, parrot: Parrot) {
    this.rowsAndColums[col][row].parrot = parrot;
  }
  getParrot(row: number, col: number): Parrot {
    return this.rowsAndColums[col][row].parrot;
  }
  getHeigth(): number{
    return this.rowsAndColums.length;
  }
  getWidth():number {
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