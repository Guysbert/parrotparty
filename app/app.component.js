"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var parrots_1 = require('./parrots');
var AppComponent = (function () {
    function AppComponent() {
        this.gridColumns = 5;
        this.gridRows = 5;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.displayGrid = true;
        this.parrots = parrots_1.PARROTS;
        this.grid = new Grid(this.gridRows, this.gridColumns);
    };
    AppComponent.prototype.selectParrot = function (id) {
        this.selectedParrot = this.parrots.find(function (parrot) { return parrot.id === id; });
        console.log(id);
    };
    AppComponent.prototype.getRows = function () {
        return this.grid.rowsAndColums;
    };
    AppComponent.prototype.cellClick = function (row, col) {
        if (this.selectedParrot) {
            if (this.grid.getParrot(row, col) != this.selectedParrot) {
                this.grid.setParrot(row, col, this.selectedParrot);
            }
            else {
                this.grid.setParrot(row, col, undefined);
            }
        }
    };
    AppComponent.prototype.createSlackString = function () {
        this.slackString = "";
        for (var y = 0; y < this.gridRows; y++) {
            for (var x = 0; x < this.gridColumns; x++) {
                var parrot = this.grid.getParrot(x, y);
                if (parrot) {
                    this.slackString = this.slackString + ':' + parrot.name + ':';
                }
                else {
                    this.slackString = this.slackString + AppComponent.PARROT_SPACER;
                }
            }
            this.slackString = this.slackString + "\n";
        }
    };
    AppComponent.PARROT_SPACER = '         ';
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html',
            styleUrls: ['app/app.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var Grid = (function () {
    function Grid(rows, cols) {
        this.rowsAndColums = [];
        for (var x = 0; x < rows; x++) {
            var row = [];
            for (var y = 0; y < rows; y++) {
                var cell = new Cell(x, y);
                row.push(cell);
            }
            this.rowsAndColums.push(row);
        }
    }
    Grid.prototype.setParrot = function (row, col, parrot) {
        this.rowsAndColums[col][row].parrot = parrot;
    };
    Grid.prototype.getParrot = function (row, col) {
        return this.rowsAndColums[col][row].parrot;
    };
    return Grid;
}());
exports.Grid = Grid;
var Cell = (function () {
    function Cell(row, col) {
        this.row = row;
        this.col = col;
    }
    return Cell;
}());
exports.Cell = Cell;
//# sourceMappingURL=app.component.js.map