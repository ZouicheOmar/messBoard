/** @format */

import usePositions from "./updatePositions";
import useCardStore from "@/context/CardStore";
import { selectCardById } from "./f&p";
import { ArrowTopLeftIcon } from "@radix-ui/react-icons";
import useUiStore from "@/context/UiStore";

const useKeyDown = () => {
   const { getCardsWithShortcuts, writeThisFile, activePrevious, activeNext } =
      useCardStore();

   const { topLeft } = useUiStore();

   const fitScreen = (e) => {
      if (!fitScreen) {
         getCanvaSize();
      }
      setTimeout(() => center(), 500);
   };

   // let n = -1;

   const handleKeyDown = (e: KeyboardEvent) => {
      // const orderedCards = getArrangedCards();
      if (e.ctrlKey && e.code === "KeyS") {
         e.preventDefault();
         e.stopPropagation();
         writeThisFile();
         return;
      }
      if (e.ctrlKey && e.code === "KeyZ") {
         e.preventDefault();
         e.stopPropagation();
         fitScreen();
         return;
      }
      if (e.ctrlKey && ["KeyW", "KeyQ", "KeyE"].includes(e.code)) {
         const cardsWithShortcuts = getCardsWithShortcuts();
         e.preventDefault();

         for (let i = 0; i < cardsWithShortcuts.length; ++i) {
            if (e.code === cardsWithShortcuts[i].shortCut) {
               selectCardById(cardsWithShortcuts[i].id);
            } else {
               continue;
            }
         }
      }
      if (e.ctrlKey && e.code === "KeyJ") {
         e.preventDefault();
         activeNext();
         e.stopPropagation();
      }
      if (e.ctrlKey && e.code === "KeyK") {
         e.preventDefault();
         activePrevious();
         e.stopPropagation();
      }
      if (e.ctrlKey && e.code === "KeyG") {
         e.preventDefault();
         const button = document.getElementById("drawerMenu");
         button?.click();
      }
      // if (e.ctrlKey && e.code === "KeyD") {
      //    e.preventDefault();
      //    console.clear();
      // }
      if (e.ctrlKey && e.code === "KeyO") {
         e.preventDefault();
         topLeft();
      } else {
         return;
      }
   };

   return handleKeyDown;
};

export default useKeyDown;
