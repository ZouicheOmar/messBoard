/** @format */
import { Toaster } from "sonner";

import useScroll from "@/hooks/useScroll.tsx";
import usePointer from "@/hooks/usePointer.tsx";
import useHotkey from "@/hooks/useHotkey.tsx";
import useZoom from "@/hooks/useZoom.tsx";

import Board from "./Board";
import LeftPanel from "./leftPanel/index.tsx";
import MousePointer from "./MousePointer.tsx";
import { useEffect } from "react";
import { useCardStore } from "@/stores/cards/index.ts";

export default function Main() {
   const getLastFile = useCardStore((s) => s.getLastFile);
   const handleWheel = useScroll();
   const { handlePointerDown, handlePointerMove } = usePointer();
   useHotkey();
   useZoom();

   useEffect(() => {
      getLastFile();
      return;
   }, []);

   return (
      <main
         onWheel={handleWheel}
         onPointerDown={handlePointerDown}
         onPointerMove={handlePointerMove}
         id="mainWrapper"
      >
         <LeftPanel />
         <Board />
         <Toaster theme="dark" className="z-30" />
         <MousePointer />
      </main>
   );
}
