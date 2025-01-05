<template>
  <div class="h-screen flex justify-center items-center ">
    <div id="sketch" class="h-4/5 w-4/5"></div>
  </div>
</template>

<script lang="ts" setup>

import p5 from 'p5';
import { Grid } from './arena/Grid';

const grid = new Grid();
// Make some random cells not empty
for (let i = 0; i < 20; i++) {
  grid.cells[Math.floor(Math.random() * grid.cells.length)].isEmpty = false;
}

const s = (p: p5) => {

  p.setup = () => {
    const parent = document.getElementById('sketch')!;
    let canvas = p.createCanvas(parent.getBoundingClientRect().width, parent.getBoundingClientRect().height);
    canvas.parent('sketch');
  };

  p.draw = () => {
    p.background(0);
    grid.update(p);
    grid.draw(p);
  };

  p.mouseClicked = () => {
    grid.mouseClicked();
  };
};

new p5(s);
</script>