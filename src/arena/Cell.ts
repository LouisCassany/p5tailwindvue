import type p5 from "p5";
import { settings } from "./settings";

type State = "hovered" | "clicked" | null

export class Cell {
    x: number
    y: number
    isHovered: boolean = false

    constructor(options: { x: number, y: number }) {
        this.x = options.x;
        this.y = options.y;
    }

    draw(p: p5) {
        p.fill(255)
        if (this.isHovered) {
            p.fill(255, 0, 0, 200)
        }
        p.rect(this.x * settings.gridSize, this.y * settings.gridSize, settings.gridSize, settings.gridSize)
    }

    update(p: p5) {
    }
}