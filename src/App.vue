<template>
  <div class="h-screen flex justify-center items-center ">
    <div id="sketch" class="h-4/5 w-4/5"></div>
  </div>
</template>

<script lang="ts" setup>

import p5 from 'p5';

const s = (p: p5) => {

  let x = 100;
  let y = 100;

  p.setup = () => {
    const parent = document.getElementById('sketch')!;
    let canvas = p.createCanvas(parent.getBoundingClientRect().width, parent.getBoundingClientRect().height);
    canvas.parent('sketch');
  };

  p.draw = () => {
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
  };
};

new p5(s);
</script>