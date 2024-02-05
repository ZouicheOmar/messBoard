/** @format */

import useCardStore from "@/stores/CardStore";
import useUiStore from "@/stores/UiStore";

export default function MousePointer() {
   const { mx, my } = useUiStore();
   const { groupMode } = useCardStore();

   return (
      groupMode && (
         <div
            id="mousePointer"
            style={{
               position: "absolute",
               backgroundColor: "#12A594",
               borderRadius: "50%",
               transform: `translate(${mx}px, ${my}px)`,
               transition: "linear 70ms",
               left: -10,
               top: -10,
               width: 20,
               height: 20,
            }}
         ></div>
      )
   );
}
