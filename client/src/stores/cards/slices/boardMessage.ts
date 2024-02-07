/** @format */

export const messageSlice = (set, get) => ({
   message: "",
   setMessage(message) {
      set((s) => {
         s.message = message;
      });
   },
});
