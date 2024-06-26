"use client";

import React, { useRef, useEffect, useCallback } from "react";

import p5 from "p5";

interface GameProps {
  sketch: (
    rows: number,
    cellWidth: number,
    onWin: () => void,
  ) => (p: p5) => void;
  rows?: number;
  cellWidth?: number;
}

function Game({ sketch, rows = 3, cellWidth = 120 }: GameProps) {
  const realCellWidth =
    window.innerWidth < 640 ? window.innerWidth / 3 - 20 : cellWidth;
  const sketchRef = useRef<HTMLDivElement>(null);

  const onWin = useCallback(() => {
    alert("You won!");
  }, []);

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
