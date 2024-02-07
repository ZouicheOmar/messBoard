/** @format */
import { useEffect } from "react";

import { useCardStore } from "@/stores/cards";
import useUiStore from "@/stores/UiStore";

export default function useInitBoard() {
   const writeThisFile = useCardStore((s) => s.writeThisFile);
   const fileName = useCardStore((s) => s.fileName);
   const initCards = useUiStore((s) => s.initCards);

   const handleBeforeUnload = () => {
      setTimeout(() => {
         writeThisFile(false);
         localStorage.setItem("last_file", fileName);
      }, 0);
   };

   useEffect(() => {
      initCards();
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
         window.removeEventListener("beforeunload", handleBeforeUnload);
      };
   }, [fileName]);
}
