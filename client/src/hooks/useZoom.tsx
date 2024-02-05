/** @format */

import { useEffect } from "react";
import useUiStore from "@/stores/UiStore";

const useZoom = () => {
   const { zoomIn, zoomOut } = useUiStore();

   const handleTouchMove = (e) => {
      e.preventDefault();
      if (e.ctrlKey) {
         if (e.deltaY > 0) {
            zoomOut();
            return;
         } else {
            zoomIn();
            return;
         }
      }
   };

   useEffect(() => {
      document.addEventListener("wheel", handleTouchMove, {
         passive: false,
      });

      return () => {
         document.removeEventListener("wheel", handleTouchMove);
      };
   });
};

export default useZoom;
