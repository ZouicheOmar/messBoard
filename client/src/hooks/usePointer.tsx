/** @format */
import useCardStore from "@/stores/CardStore";
import useUiStore from "@/stores/UiStore";

import { getRectById } from "../utils/positions";
import { useCallback } from "react";

export default function usePointer() {
   const { setMx, setMy, selectModeOff } = useUiStore();
   const { groupSelected, groupMode } = useCardStore();

   const handlePointerDown = useCallback((e) => {
      setMx(e.nativeEvent.clientX);
      setMy(e.nativeEvent.clientY);

      if (groupMode) {
         const boardRect = getRectById("board");
         if (boardRect !== undefined) {
            const point = {
               x: e.nativeEvent.clientX - boardRect.x,
               y: e.nativeEvent.clientY - boardRect.y - 30,
            };

            groupSelected(point);
         } else {
            console.log("board bounding rect is undefined");
         }
      }

      if (
         !e.target.id.includes("select") &&
         !e.target.id.includes("mousePointer")
      ) {
         selectModeOff();
      }
   }, []);

   const handlePointerMove = (e) => {
      if (groupMode) {
         setMx(e.nativeEvent.clientX);
         setMy(e.nativeEvent.clientY);
      }
   };

   return { handlePointerDown, handlePointerMove };
}
