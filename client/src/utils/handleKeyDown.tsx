/** @format */

import usePositions from "./updatePositions";
import useCardsState from "@/context/CardStore";
import { selectCardById } from "./f&p";
import { ArrowTopLeftIcon } from "@radix-ui/react-icons";
import useUiStore from "@/context/UiStore";

const useKeyDown = () => {
   // const updatePositions = usePositions();
   const {
      getCardsWithShortcuts,
      getArrangedCards,
      writeThisFile,
      logState,
      cards,
      toggleFoldCard,
      activePrevious,
      activeNext,
   } = useCardsState();

   const { topLeft } = useUiStore();

   let n = -1;

   const handleKeyDown = (e: KeyboardEvent) => {
      const orderedCards = getArrangedCards();
      if (e.ctrlKey && e.code === "KeyS") {
         e.preventDefault();
         writeThisFile();
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
      if (e.ctrlKey && e.code === "KeyD") {
         e.preventDefault();
         console.clear();
         // document.getElementById("clear_button")?.click();
      }
      if (e.ctrlKey && e.code === "KeyO") {
         e.preventDefault();
         topLeft();
      }
      if (e.shiftKey && e.code === "KeyL") {
         e.preventDefault();
         e.stopPropagation();
         logState();
      } else {
         return;
      }
   };

   return handleKeyDown;
};

export default useKeyDown;
