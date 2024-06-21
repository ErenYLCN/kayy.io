"use client";

import Game from "@/component/Game";
import sketch from "@/sketch/sketch";

export default function Home() {
  return (
    <main className={"flex min-h-screen flex-col items-center p-12"}>
      <span>{"Developed by"}</span>
      <h1 className={"mb-4"}>
        <a
          href={"https://erenyalcin.vercel.app/"}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          {"@ErenYLCN"}
        </a>
      </h1>

      <Game sketch={sketch} rows={3} cellWidth={160} onWin={handleWin} />
    </main>
  );

  function handleWin() {
    alert("You won!");
  }
}
