/** @format */

export const groupeSlice = (set, get) => ({
   groupMode: false,
   groupPoint: 0,

   makeGroupGrid: (groupPoint, cards, gap = 56) => {
      const { x, y } = groupPoint;

      const grid = [];

      for (let i = 0; i < cards.length; i++) {
         const point = {
            top: y + (i + 1) * gap,
            left: x,
         };
         const id = cards[i];

         grid.push({
            id: id,
            ...point,
         });
      }

      return grid;
   },

   toggleGroupMode: (value = true) => {
      set((state) => {
         state.groupMode = value;
         return;
      });
   },

   groupSelected: (point) => {
      const selected = useUiStore.getState().uiCards;
      const selectedCards = [];
      const makeGroupGrid = get().makeGroupGrid;

      for (const id in selected) {
         if (selected[id].selected) {
            selectedCards.push(id);
         } else {
            continue;
         }
      }

      const grid = makeGroupGrid(point, selectedCards, 30);

      for (let i = 0; i < grid.length; i++) {
         const { id, top, left } = grid[i];
         const card = document.getElementById(id);
         set((state) => {
            state.cards[id].position = {
               top: top,
               left: left,
            };
            return;
         });
         animate(
            card,
            {
               x: left,
               y: top,
            },
            {
               duration: 0.2,
            }
         );
      }

      get().toggleGroupMode(false);
      useUiStore.getState().selectModeOff();
   },
});
