"use client";

import React, { useRef, useEffect } from "react";

import p5 from "p5";

interface GameProps {
  sketch: (
    rows: number,
    cellWidth: number,
    onWin: () => void,
  ) => (p: p5) => void;
  rows?: number;
  cellWidth?: number;
  onWin: () => void;
}

function Game({ sketch, rows = 3, cellWidth = 120, onWin }: GameProps) {
  const realCellWidth =
    window.innerWidth < 640 ? window.innerWidth / 3 - 20 : cellWidth;
  console.log(window.innerWidth);
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p5Instance = new p5(
      sketch(rows, realCellWidth, onWin),
      sketchRef.current as HTMLElement,
    );
    return () => {
      p5Instance.remove();
    };
  }, [sketch, rows, onWin, realCellWidth]);

  return (
    <div
      style={{ padding: "12px", backgroundColor: "#000" }}
      className={"rounded-lg overflow-hidden p-6"}
    >
      <div id={"canvas-wrapper"} ref={sketchRef} />
    </div>
  );
}

export default Game;
