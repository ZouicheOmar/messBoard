/** @format */
import { WheelEvent } from "react";
import useUiStore from "@/stores/UiStore";

const useScroll = () => {
   const { translateX, setTX, translateY, setTY } = useUiStore();

   const handleWheel = (e: WheelEvent) => {
      const board = document.getElementById("board");
      if (e.deltaX) {
         setTX(translateX - e.deltaX, board);
      }
      if (e.deltaY && e.ctrlKey === false) {
         setTY(translateY - e.deltaY, board);
      }
   };

   return handleWheel;
};

export default useScroll;
