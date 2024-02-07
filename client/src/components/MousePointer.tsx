/** @format */

import { useCardStore } from "@/stores/cards";
import useUiStore from "@/stores/UiStore";

export default function MousePointer() {
   const mx = useUiStore((s) => s.mx);
   const my = useUiStore((s) => s.my);
   const groupMode = useCardStore((s) => s.groupMode);

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
