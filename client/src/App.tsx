/** @format */
import { useEffect, useState } from "react";

import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
import "./App.css";

import useUiStore from "./context/UiStore.tsx";
import useZoom from "./utils/handleZoom.tsx";

import Board from "./components/Board";
import LeftPanel from "./components/LeftPanel";
import MousePointer from "./components/MousePointer.tsx";
import useCardsState, {
   save_file_url,
   createFile_url,
   select_file_url,
} from "./context/CardStore.tsx";
import { getRectById } from "./utils/f&p.ts";

import TestRect from "./components/testComponents/TestRect.tsx";

const mainStyle = {
   position: "fixed",
   width: "100%",
   height: "100%",
   // backgroundColor: "#030712",
   // backgroundColor: "#49474E",
   backgroundColor: "#121113",
   top: 0,
   left: 0,
   contain: "strict",
   margin: 0,
   boxSizing: "border-box",
   display: "flex",
   paddingLeft: "11rem",
   paddingTop: "2rem",
   alignItems: "start",
   justifyContent: "start",
};

function App() {
   const { setMx, setMy, selectModeOff } = useUiStore();
   const { groupSelected, groupMode, getLastFile } = useCardsState();
   const handleWheel = useZoom();

   useEffect(() => {
      getLastFile();
   }, []);

   const handlePointerDown = (e) => {
      // e.stopPropagation()
      // e.preventDefault()

      setMx(e.nativeEvent.clientX);
      setMy(e.nativeEvent.clientY);

      if (groupMode) {
         const boardRect = getRectById("board");
         if (boardRect !== undefined) {
            const point = {
               x: e.nativeEvent.clientX - boardRect.x,
               y: e.nativeEvent.clientY - boardRect.y - 30,
            };

            console.log(point);
            groupSelected(point);
         } else {
            console.log("board bounding rect is undefined");
         }
      }

      if (
         !e.target.id.includes("select") &&
         !e.target.id.includes("mousePointer")
      ) {
         selectModeOff();
      }
   };

   const handlePointerMove = (e) => {
      if (groupMode) {
         setMx(e.nativeEvent.clientX);
         setMy(e.nativeEvent.clientY);
      }
   };

   return (
      <>
         <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <main
               style={mainStyle}
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
         </ThemeProvider>
      </>
   );
}

export default App;
