"use client";

import board from "@/board/board";
import P5Wrapper from "@/component/P5Wrapper";

export default function Home() {
  return (
    <main className={"flex min-h-screen flex-col items-center p-12"}>
      {"kay.io"}

      <P5Wrapper board={board} rows={3} cellWidth={160} onWin={handleWin} />
    </main>
  );

  function handleWin() {
    alert("You won!");
  }
}
