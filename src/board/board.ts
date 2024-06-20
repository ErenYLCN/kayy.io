"use client";

import p5 from 'p5';

const board = (p: p5) => {
  p.setup = () => {
    p.createCanvas(600, 600);
    p.background(200);
  };

  p.draw = () => {
    p.fill(255, 0, 0);
    p.ellipse(p.width / 2, p.height / 2, 50, 50);
  };
};

export default board;
