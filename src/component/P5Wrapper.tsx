"use client";

import React, { useRef, useEffect } from "react";

import p5 from "p5";

interface P5WrapperProps {
  board: (
    rows: number,
    cellWidth: number,
    onWin: () => void,
  ) => (p: p5) => void;
  rows?: number;
  cellWidth?: number;
  onWin: () => void;
}

const P5Wrapper: React.FC<P5WrapperProps> = ({
  board,
  rows = 3,
  cellWidth = 120,
  onWin,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p5Instance = new p5(
      board(rows, cellWidth, onWin),
      boardRef.current as HTMLElement,
    );
    return () => {
      p5Instance.remove();
    };
  }, [board, rows, cellWidth, onWin]);

  return (
    <div
      style={{ padding: "12px", backgroundColor: "#000" }}
      className={"rounded-lg overflow-hidden p-6"}
    >
      <div id={"canvas-wrapper"} ref={boardRef} />
    </div>
  );
};

export default P5Wrapper;
