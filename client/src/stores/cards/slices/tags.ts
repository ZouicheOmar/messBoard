/** @format */

export const tagsSlice = (set, get) => ({
   // addTag: (id, tag) => {
   setTag: (id, tag) => {
      return set((s) => {
         s.cards[id].tags.push(tag);
      });
   },

   removeTag: (id, tag) => {
      const tags = get().cards[id].tags;
      const index = tags.indexOf(tag);

      return set((state) => {
         state.cards[id].tags.splice(index, 1);
      });
   },
});
