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

    getHoveredCell(): Cell | undefined {
        return this.cells.filter(cell => cell.isHovered)[0]
    }

    mouseClicked() {
        const hoveredCell = this.getHoveredCell()
        if (hoveredCell) {
            this.getVisibleCells(hoveredCell, 5).forEach(cell => {
                cell.color = 'blue'
            })
        }
    }

    getVisibleCells(
        center: Cell,
        range: number
    ): Cell[] {
        const result: Cell[] = [];
        const gridMap = new Map<string, Cell>();

        // Map cells for quick lookup by coordinates
        for (const cell of this.cells) {
            gridMap.set(`${cell.x},${cell.y}`, cell);
        }

        // Helper to get a cell by coordinates
        const getCell = (x: number, y: number): Cell | undefined =>
            gridMap.get(`${x},${y}`);

        // Bresenham's line algorithm
        function isLineClear(x1: number, y1: number, x2: number, y2: number): boolean {
            let dx = Math.abs(x2 - x1);
            let dy = Math.abs(y2 - y1);
            let sx = x1 < x2 ? 1 : -1;
            let sy = y1 < y2 ? 1 : -1;
            let err = dx - dy;

            let x = x1;
            let y = y1;

            while (x !== x2 || y !== y2) {
                if (x !== x1 || y !== y1) {
                    const cell = getCell(x, y);
                    if (cell && !cell.isEmpty) return false; // Blocked by a non-empty cell
                }
                const e2 = 2 * err;
                if (e2 > -dy) {
                    err -= dy;
                    x += sx;
                }
                if (e2 < dx) {
                    err += dx;
                    y += sy;
                }
            }
            return true;
        }

        // Check all cells within the range
        for (let x = center.x - range; x <= center.x + range; x++) {
            for (let y = center.y - range; y <= center.y + range; y++) {
                if (x === center.x && y === center.y) continue; // Skip the center cell
                const distance = Math.sqrt((x - center.x) ** 2 + (y - center.y) ** 2);
                if (distance <= range) {
                    const targetCell = getCell(x, y);
                    if (targetCell && isLineClear(center.x, center.y, x, y)) {
                        result.push(targetCell);
                    }
                }
            }
        }

        return result;
    }

    update(p: p5) {
        this.cells.forEach(cell => {
            cell.update(p)
        })
    }

}