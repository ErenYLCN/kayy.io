"use client";

import React, { useRef, useEffect } from "react";

import p5 from "p5";

interface P5WrapperProps {
  board: (p: p5) => void;
}

const P5Wrapper: React.FC<P5WrapperProps> = ({ board }) => {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p5Instance = new p5(board, boardRef.current as HTMLElement);
    return () => {
      p5Instance.remove();
    };
  }, [board]);

  return <div id={"canvas-wrapper"} ref={boardRef}></div>;
};

export default P5Wrapper;
