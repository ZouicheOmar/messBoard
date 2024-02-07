/** @format */

import { animate } from "framer-motion";
import useUiStore from "@/stores/UiStore";

export const foldSlice = (set, get) => ({
   setFolded(id, value) {
      set((state) => {
         state.cards[id].folded = value;
      });
   },
   //remove updateFolded
   toggleFoldCard(id) {
      const card = get().cards[id];
      const card_rnd = document.getElementById(id + "-rnd");
      if (card.folded) {
         set((state) => {
            state.cards[id].folded = false;
         });

         animate(
            card_rnd,
            {
               ...card.size,
            },
            {
               duration: 0.3,
            }
         );
      } else {
         const folded_size = {
            width: 300,
            height: 56,
         };

         animate(
            card_rnd,
            {
               ...folded_size,
            },
            {
               duration: 0.3,
            }
         );

         set((state) => {
            // state.cards[id].size = card.size
            state.cards[id].folded = true;
         });
      }
   },

   foldSelected() {
      const selected = useUiStore.getState().uiCards;
      const toggleFoldCard = get().toggleFoldCard;
      const cards = get().cards;

      for (const id in selected) {
         if (
            selected[id].selected &&
            !["markdown", "image"].includes(cards[id].type)
         ) {
            toggleFoldCard(id);
         } else {
            continue;
         }
      }

      useUiStore.getState().toggleSelect();

      return;
   },
});
