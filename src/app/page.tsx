import board from "@/board/board";
import P5Wrapper from "@/component/P5Wrapper";

export default function Home() {
  return (
    <main className={"flex min-h-screen flex-col items-center p-24"}>
      {"kay.io"}

      <P5Wrapper board={board} />
    </main>
  );
}
