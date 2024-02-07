/** @format */

import { activateTextAreaById } from "@/utils/positions";

export const activeSlice = (set, get) => ({
   activated: false,
   setActive(id) {
      set((s) => (s.activated = id));
   },
   active(id) {
      get().getArrangedNotesAndCodes();

      const activated = get().activated;
      const putOnTop = get().putOnTop;

      if (activated) {
         set((s) => {
            s.activated = false;
         });
      } else {
         putOnTop(id);
         set((s) => (s.activated = id));
      }
   },

   activePrevious() {
      get().getArrangedNotesAndCodes();
      const cards = get().arrangedNotesAndCodes;

      const activated = get().activated;
      const putOnTop = get().putOnTop;

      let actualCardId;

      if (activated) {
         for (let i = 0; i < cards.length; i++) {
            const { id } = cards[i];
            if (id === activated) {
               const previousIndex = i === 0 ? cards.length - 1 : i - 1;
               const nextId = cards[previousIndex].id;
               activateTextAreaById(nextId);
               actualCardId = nextId;
            }
         }
      } else {
         const { id } = cards[0];
         activateTextAreaById(id);
         putOnTop(id);
         actualCardId = id;
      }
      putOnTop(actualCardId);
      return;
   },

   activeNext() {
      get().getArrangedNotesAndCodes();
      const cards = get().arrangedNotesAndCodes;

      const activated = get().activated;
      const putOnTop = get().putOnTop;

      if (activated) {
         for (let i = 0; i < cards.length; i++) {
            const { id } = cards[i];
            if (id === activated) {
               const previousIndex = i === cards.length - 1 ? 0 : i + 1;
               const nextId = cards[previousIndex].id;
               activateTextAreaById(nextId);
               putOnTop(nextId);
               return;
            }
         }
      } else {
         const { id } = cards[0];
         activateTextAreaById(id);
         putOnTop(id);
      }
   },
});
