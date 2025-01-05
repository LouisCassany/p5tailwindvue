import type p5 from "p5";
import { settings } from "./settings";

export class Cell {
    x: number
    y: number
    isHovered: boolean = false
    isEmpty: boolean = true
    color: string = 'white'

    constructor(options: { x: number, y: number }) {
        this.x = options.x;
        this.y = options.y;
    }

    draw(p: p5) {
        p.fill(this.color)
        p.rect(this.x * settings.gridSize, this.y * settings.gridSize, settings.gridSize, settings.gridSize)

        if (!this.isEmpty) {
            p.fill(0)
            p.ellipse(this.x * settings.gridSize + settings.gridSize / 2, this.y * settings.gridSize + settings.gridSize / 2, settings.gridSize / 2)
        }
    }

    update(p: p5) {
        // Check if the mouse is hovering over the cell
        if (p.mouseX > this.x * settings.gridSize && p.mouseX < this.x * settings.gridSize + settings.gridSize &&
            p.mouseY > this.y * settings.gridSize && p.mouseY < this.y * settings.gridSize + settings.gridSize) {
            this.isHovered = true
        } else {
            this.isHovered = false
        }
    }
}