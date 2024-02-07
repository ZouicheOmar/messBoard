/** @format */

import { animate } from "framer-motion";
import { getRectById } from "@/utils/positions";

export const focusSlice = (set, get) => ({
   focused: false,

   focus(id, rndId) {
      get().getArrangedCards();
      const wrapper_rect = getRectById("mainWrapper");

      const card = document.getElementById(id);
      const cardRnd = document.getElementById(rndId);

      const {
         size: cardSize,
         position: cardPosition,
         type: cardType,
         size,
      } = get().cards[id];

      const focused = get().focused;
      const putOnTop = get().putOnTop;

      const { width, height } = wrapper_rect;
      const focus_size = {
         width: 0.8 * width,
         height: 0.9 * height,
      };
      let imageFocusSize;
      const focus_position = {
         x: 0,
         y: 0,
      };

      if (focused) {
         animate(
            card,
            {
               x: cardPosition.left,
               y: cardPosition.top,
            },
            {
               duration: 0.1,
               delay: 0.2,
            }
         );

         animate(
            cardRnd,
            {
               ...cardSize,
            },
            {
               duration: 0.2,
            }
         );

         set((state) => {
            state.focused = false;
            return;
         });
      } else {
         putOnTop(id);
         useUiStore.getState().zoomReset();

         if (cardType === "image") {
            const focusImagePosition = {
               x: "40%",
               y: 0,
               originX: "50%",
            };
            const { aspect } = get().cards[id];
            const { width: imw, height: imh } = size;
            if (width >= height) {
               const ratio = width / imw;
               imageFocusSize = {
                  width: imw * ratio * 0.5,
                  height: imh * ratio * 0.5,
               };

               animate(
                  card,
                  {
                     ...focusImagePosition,
                  },
                  {
                     duration: 0.1,
                  }
               );

               animate(
                  cardRnd,
                  {
                     ...imageFocusSize,
                  },
                  {
                     duration: 0.2,
                     delay: 0.1,
                  }
               );
            } else {
               const ratio = height / imh;
               imageFocusSize = {
                  width: imw * ratio * 0.5,
                  height: imh * ratio * 0.5,
               };
               animate(
                  cardRnd,
                  {
                     ...imageFocusSize,
                  },
                  {
                     duration: 0.2,
                     delay: 0.1,
                  }
               );
               animate(
                  card,
                  {
                     ...focusImagePosition,
                  },
                  {
                     duration: 0.1,
                  }
               );
            }
         } else {
            animate(
               card,
               {
                  ...focus_position,
               },
               {
                  duration: 0.1,
               }
            );
            animate(
               cardRnd,
               {
                  ...focus_size,
               },
               {
                  duration: 0.2,
                  delay: 0.1,
               }
            );
         }

         set((state) => {
            state.focused = id;
            return;
         });
      }
   },

   focusPrevious() {
      const arranged = get().arranged;
      const ids = [];
      for (let i = 0; i < arranged.length; i++) {
         ids.push(arranged[i].id);
      }
      const focus = get().focus;
      const putOnTop = get().putOnTop;

      const focused_card = get().focused;
      const focused_card_rnd = focused_card + "-rnd";

      let index =
         ids.indexOf(focused_card) === 0
            ? ids.length
            : ids.indexOf(focused_card);

      const previous_card_id = ids[(index - 1) % ids.length];
      const previous_card_rnd = previous_card_id + "-rnd";

      focus(focused_card, focused_card_rnd);
      putOnTop(previous_card_id);
      focus(previous_card_id, previous_card_rnd);
   },

   focusNext() {
      const arranged = get().arranged;
      const ids = [];
      for (let i = 0; i < arranged.length; i++) {
         ids.push(arranged[i].id);
      }
      const focus = get().focus;
      const putOnTop = get().putOnTop;

      const focused_card = get().focused;
      const focused_card_rnd = focused_card + "-rnd";

      const index = ids.indexOf(focused_card);

      const next_card_id = ids[(index + 1) % ids.length];
      const next_card_rnd = next_card_id + "-rnd";

      focus(focused_card, focused_card_rnd);
      putOnTop(next_card_id);
      focus(next_card_id, next_card_rnd);
   },

   setFocused(value) {
      set((s) => {
         s.focused = value;
      });
   },
});
