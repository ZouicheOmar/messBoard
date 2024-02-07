/** @format */
import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { motion, useAnimate, useDragControls } from "framer-motion";
import { Resizable } from "re-resizable";

import useUiStore from "@/stores/UiStore";
// import useCardStore from "@/stores/CardStore";
import { useCardStore } from "@/stores/cards";

import { DragIcon } from "@/components/Icons";
import { pixelToNum } from "@/utils/positions";

export default function RND(props) {
   const { children, id } = props;
   const [divScope, animate] = useAnimate();
   const dragControls = useDragControls();

   const { select } = useUiStore((s) => s.select);
   const { cards, setSize, putOnTop, setFolded, setPosition } = useCardStore(
      useShallow((s) => ({
         cards: s.cards,
         setSize: s.setSize,
         putOnTop: s.putOnTop,
         setFolded: s.setFolded,
         setPosition: s.setPosition,
      }))
   );

   const card = cards[id];
   // const { position, folded, size, type } = card;
   const { position, size, type } = card;

   useEffect(() => {
      animate(divScope.current, {
         x: position.left,
         y: position.top,
      });
   }, [select]);

   const startDrag = useCallback((event) => {
      dragControls.start(event);
   });

   const handleDragEnd = useCallback((e, info) => {
      const { x, y } = info.offset;
      const { top, left } = position;
      const new_pos = {
         top: top + y,
         left: left + x,
      };

      setPosition(id, new_pos);
   });

   const handleResizeStop = (e, direction, ref, delta, position) => {
      const new_size = {
         width: pixelToNum(ref.style.width),
         height: pixelToNum(ref.style.height),
      };

      setSize(id, new_size);
      setFolded(id, false);
   };

   const handleBringToTop = (e) => {
      e.stopPropagation();
      putOnTop(id);
   };

   return (
      <motion.div
         ref={divScope}
         id={id}
         drag
         dragControls={dragControls}
         dragListener={false}
         dragMomentum={false}
         // onDoubleClick={handleBringToTop}
         onPointerDown={handleBringToTop}
         onDragStart={handleBringToTop}
         onDragEnd={handleDragEnd}
         className="absolute w-fit h-fit cursor-default drop-shadow-2xl  "
      >
         <Resizable
            id={id + "-rnd"}
            size={size}
            onResizeStop={handleResizeStop}
            enable={{
               bottom: true,
               bottomRight: true,
               right: true,
            }}
            lockAspectRatio={type === "image" && cards[id].aspect}
            minWidth="300px"
            maxWidth="1500px"
            minHeight={type === "markdown" ? "80px" : "56px"}
            maxHeight="2500px"
         >
            <span
               className="absolute top-2 right-4 w-fit hover:cursor-grab mix-blend-difference"
               onPointerDown={startDrag}
            >
               <DragIcon className="" />
            </span>
            {children}
         </Resizable>
      </motion.div>
   );
}
