/** @format */

import { makeGrid } from "@/utils/positions";
import { animate } from "framer-motion";

export const organizeSlice = (set, get) => ({
   organize: () => {
      let ids = [];
      const { setPosition, setFolded, setSize, cards, putOnTop } = get();
      const { noteGrid, codeGrid, markdownGrid, imageGrid } = makeGrid(cards);

      //   let positions = getCurrentCardsPositions(ids);
      //   let pairs = [];

      for (let i = 0; i < noteGrid.length; i++) {
         const { id, size, position } = noteGrid[i];
         const card = document.getElementById(id);
         const cardRND = document.getElementById(id + "-rnd");

         setPosition(id, position);
         setSize(id, size);

         animate(
            card,
            {
               x: position.left,
               y: position.top,
            },

            { duration: 0.3 }
         );

         animate(cardRND, size, { duration: 0.3 });
      }

      for (let i = 0; i < codeGrid.length; i++) {
         const { id, size, position } = codeGrid[i];
         const card = document.getElementById(id);
         const cardRND = document.getElementById(id + "-rnd");

         setPosition(id, position);
         setSize(id, size);

         animate(
            card,
            {
               x: position.left,
               y: position.top,
            },

            { duration: 0.3 }
         );

         animate(cardRND, size, { duration: 0.3 });
      }

      for (let i = 0; i < markdownGrid.length; i++) {
         const { id, size, position } = markdownGrid[i];
         const card = document.getElementById(id);
         const cardRND = document.getElementById(id + "-rnd");

         setPosition(id, position);
         setSize(id, size);

         animate(
            card,
            {
               x: position.left,
               y: position.top,
            },

            { duration: 0.3 }
         );

         animate(cardRND, size, { duration: 0.3 });
      }

      for (let i = 0; i < imageGrid.length; i++) {
         const { id, size, position } = imageGrid[i];
         const card = document.getElementById(id);
         const cardRND = document.getElementById(id + "-rnd");

         setPosition(id, position);
         setSize(id, size);

         animate(
            card,
            {
               x: position.left,
               y: position.top,
            },

            { duration: 0.3 }
         );
      }
   },
});
