/** @format */
import useUiStore from "@/stores/UiStore";

export const selectSlice = (set, get) => ({
   deleteSelected() {
      const selected = useUiStore.getState().uiCards;
      const to_delete = [];
      const deleteCard = get().deleteCard;

      console.log("selected items", selected);

      for (const id in selected) {
         if (selected[id].selected) {
            console.log("item", id);
            deleteCard(id);
            to_delete.push(id);
         } else {
            continue;
         }
      }

      useUiStore.getState().toggleSelect();
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
   },
});
