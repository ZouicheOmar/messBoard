/** @format */
import { useCallback, useEffect } from "react";

import { useShallow } from "zustand/react/shallow";
import { useCardStore } from "@/stores/cards";
import useUiStore from "@/stores/UiStore";

import { selectCardById } from "@/utils/positions";

const useHotkey = () => {
   const {
      getCardsWithShortcuts,
      writeThisFile,
      activePrevious,
      activeNext,
      cards,
   } = useCardStore(
      useShallow((s) => ({
         getCardsWithShortcuts: s.getCardsWithShortcuts,
         writeThisFile: s.writeThisFile,
         activePrevious: s.activePrevious,
         activeNext: s.activeNext,
         cards: s.cards,
      }))
   );
   const { topLeft } = useUiStore();

   const fitScreen = () => {
      if (!fitScreen) {
         getCanvaSize();
      }
      setTimeout(() => center(), 500);
   };

   const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === "KeyS") {
         e.preventDefault();
         e.stopPropagation();
         writeThisFile();
         return;
      }
      if (e.shiftKey && e.code === "KeyL") {
         // e.preventDefault();
         for (const card in cards) {
            console.log(cards[card]);
         }
      }
      if (e.ctrlKey && e.code === "KeyZ") {
         e.preventDefault();
         e.stopPropagation();
         fitScreen();
         return;
      }
      if (e.ctrlKey && ["KeyW", "KeyQ", "KeyE"].includes(e.code)) {
         e.preventDefault();
         const cardsWithShortcuts = getCardsWithShortcuts();

         for (let i = 0; i < cardsWithShortcuts.length; ++i) {
            if (e.code === cardsWithShortcuts[i].shortCut) {
               selectCardById(cardsWithShortcuts[i].id);
            } else {
               continue;
            }
         }
      }
      // if (e.ctrlKey && e.code === "KeyJ") {
      //    e.preventDefault();
      //    e.stopPropagation();
      //    activeNext();
      // }
      // if (e.ctrlKey && e.code === "KeyK") {
      //    e.preventDefault();
      //    e.stopPropagation();
      //    activePrevious();
      // }
      // if (e.ctrlKey && e.code === "KeyG") {
      //    e.preventDefault();
      //    const button = document.getElementById("drawerMenu");
      //    button?.click();
      // }
      // if (e.ctrlKey && e.code === "KeyO") {
      //    e.preventDefault();
      //    topLeft();
      // }
   }, []);

   useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, []);
};

export default useHotkey;
