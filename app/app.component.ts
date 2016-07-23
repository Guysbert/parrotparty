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

  private gridColumns: number = 5;
  private gridRows: number = 5;

  private static PARROT_SPACER = '         ';

  ngOnInit() {
    this.displayGrid = true;
    this.parrots = PARROTS;
    this.grid = new Grid(this.gridRows, this.gridColumns);
  }

  selectParrot(id: number) {
    this.selectedParrot = this.parrots.find(parrot => parrot.id === id);
    console.log(id);
  }

  getRows() {
    return this.grid.rowsAndColums;
  }

  cellClick(row, col) {
    if (this.selectedParrot) {
      if (this.grid.getParrot(row, col) != this.selectedParrot) {
        this.grid.setParrot(row, col, this.selectedParrot);
      } else {
        this.grid.setParrot(row, col, undefined);
      }
    }
  }

  createSlackString() {
    this.slackString = "";
    for (let y = 0; y < this.gridRows; y++){
      for (let x = 0; x < this.gridColumns; x++){
        let parrot:Parrot = this.grid.getParrot(x,y);
        if (parrot){
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
      for (let y = 0; y < rows; y++) {
        let cell = new Cell(x, y);
        row.push(cell);
      }
      this.rowsAndColums.push(row);
    }
  }

  setParrot(row: number, col: number, parrot: Parrot) {
    this.rowsAndColums[col][row].parrot = parrot;
  }
  getParrot(row: number, col: number): Parrot {
    return this.rowsAndColums[col][row].parrot;
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