/** @format */
import useUiStore from "../context/UiStore";

const useZoom = () => {
   const { translateX, setTX, translateY, setTY, zoomIn, zoomOut } =
      useUiStore();

   const handleWheel = (e: WheelEvent) => {
      const board = document.getElementById("board");
      const ne = e.nativeEvent;
      const dx = ne.wheelDeltaX;
      const dy = ne.wheelDeltaY;

      if (dx !== 0) {
         setTX(translateX - dx, board);
      }

      if (dy !== 0 && Math.abs(dy) !== 150) {
         if (e.ctrlKey && dy > 0) {
            zoomIn();
         }
         if (e.ctrlKey && dy < 0) {
            zoomOut();
         } else {
            setTY(translateY + dy, board);
         }
      } else {
         return;
      }
   };

   return handleWheel;
};

export default useZoom;
