/** @format */

export const canvaSlice = (set, get) => ({
   //rename this to fitToScale
   getCanvaSize() {
      const arranged = get().getArrangedCards();
      const fitCanva = useUiStore.getState().fitCanva;

      const { left: topLeftx, top: topLefty } = arranged[0];
      const {
         left: lastx,
         top: lasty,
         width: lastw,
         height: lasth,
      } = arranged[arranged.length - 1];

      const bottomRightx = lastx + lastw;
      const bottomRighty = lasty + lasth;

      const { width, height, top, left } = getRectById("boardWrapper");

      const canvaWidth = bottomRightx - (left + topLeftx);
      const canvaHeight = bottomRighty - (top + topLefty);

      const widthRatio = canvaWidth / width;
      const heightRatio = canvaHeight / height;

      if (canvaWidth <= 0 || canvaHeight <= 0) {
         if (canvaWidth >= canvaHeight) {
            fitCanva(widthRatio);
         } else {
            fitCanva(heightRatio);
         }
      }
   },
});
