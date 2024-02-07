/** @format */

export const withShortcutSlice = (set, get) => ({
   getCardsWithShortcuts() {
      const cardsWithShortcuts = [];
      const cards = get().cards;

      //why object entries ??????
      // try something better
      for (let card of Object.entries(cards)) {
         if (card[1].shortcut !== "") {
            cardsWithShortcuts.push({
               id: card[0],
               shortCut: card[1].shortcut,
            });
         }
      }

      return cardsWithShortcuts;
   },
});
