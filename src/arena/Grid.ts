import { settings } from "./settings";
import { Cell } from "./Cell";
import p5 from "p5";

export class Grid {
    cells: Cell[]

    constructor() {
        this.cells = []
        for (let y = 0; y < settings.gridWidth; y++) {
            for (let x = 0; x < settings.gridHeight; x++) {
                this.cells.push(new Cell({ x: x, y: y }))
            }
        }
    }

    draw(p: p5) {
        this.cells.forEach(cell => {
            cell.draw(p)
        })
    }

    handleHover(p: p5): Cell | undefined {
        const x = Math.floor(p.mouseX / settings.gridSize)
        const y = Math.floor(p.mouseY / settings.gridSize)
        const hoveredCell = this.cells.find(cell => cell.x === x && cell.y === y)
        this.cells.forEach(cell => {
            cell.isHovered = false
        })
        if (hoveredCell) {
            hoveredCell.isHovered = true
        }
        return hoveredCell
    }

    mouseClicked(p: p5) {
        const hoveredCell = this.handleHover(p)
        if (hoveredCell) {
            console.log(hoveredCell)
        }
    }

    update(p: p5) {
        this.handleHover(p)
        this.cells.forEach(cell => {
            cell.update(p)
        })
    }

}