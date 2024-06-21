"use client";

import Game from "@/component/Game";
import sketch from "@/sketch/sketch";

export default function Home() {
  return (
    <main className={"flex min-h-screen flex-col items-center p-12"}>
      {"kay.io"}

      <Game sketch={sketch} rows={3} cellWidth={160} onWin={handleWin} />
    </main>
  );

  function handleWin() {
    alert("You won!");
  }
}
