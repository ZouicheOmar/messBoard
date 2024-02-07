/** @format */

export const putOnTopSlice = (set, get) => ({
   putOnTop(id: string) {
      const cards = get().cards;
      // let initialCardsArray = Object.entries(cards);
      // let toPutOnTop = [];
      // let position = 0;

      // initialCardsArray.map((item, index) => {
      //    if (item[0] === id) {
      //       position = index;
      //    }
      // });

      // toPutOnTop = initialCardsArray.splice(position, 1);
      // initialCardsArray.push(...toPutOnTop);
      // const newCardsObject = Object.fromEntries(initialCardsArray);

      // set((state) => {
      //    state.cards = {
      //       ...newCardsObject,
      //    };
      //    return;
      // });
      // return;

      //try this function
      // let shift;
      set((s) => {
         const card = s.cards[id];
         delete s.cards[id];
         s.cards[id] = card;
      });
   },
});
