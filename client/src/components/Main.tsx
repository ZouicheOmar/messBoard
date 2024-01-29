/** @format */
import { Toaster } from "sonner";

import useZoom from "@/utils/handleZoom.tsx";
import usePointer from "@/utils/usePointer.tsx";
import InitBoardEffect from "@/utils/useInitBoard.tsx";

import Board from "./Board";
import LeftPanel from "./LeftPanel";
import MousePointer from "./MousePointer.tsx";

export default function Main() {
   const handleWheel = useZoom();
   const { handlePointerDown, handlePointerMove } = usePointer();
   InitBoardEffect();

   return (
      <main
         onWheel={handleWheel}
         onPointerDown={handlePointerDown}
         onPointerMove={handlePointerMove}
         id="mainWrapper"
      >
         <LeftPanel />
         <Board />
         <Toaster theme="dark" className="z-30 bg-slate-800" />
         <MousePointer />
      </main>
   );
}
