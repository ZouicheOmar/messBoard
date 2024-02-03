/** @format */
import { Toaster } from "sonner";

import useZoom from "@/hooks/useZoom.tsx";
import usePointer from "@/hooks/usePointer.tsx";
import useHotkey from "@/hooks/useHotkey.tsx";

import Board from "./Board";
import LeftPanel from "./LeftPanel";
import MousePointer from "./MousePointer.tsx";
import { useEffect } from "react";
import useCardStore from "@/context/CardStore.tsx";

export default function Main() {
   const { getLastFile } = useCardStore();
   const handleWheel = useZoom();
   const { handlePointerDown, handlePointerMove } = usePointer();

   useHotkey();
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
