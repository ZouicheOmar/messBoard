/** @format */

export const logSlice = (set, get) => ({
   logState() {
      const cards = get().cards;
      console.log("activated", cards);
   },
});
