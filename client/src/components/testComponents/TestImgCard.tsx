/** @format */

import { motion, useAnimate, useDragControls } from "framer-motion";
import { Resizable } from "re-resizable";
import { useCallback, useEffect, useState } from "react";

import { getRectById, pixelToNum } from "@/utils/f&p";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { DragIcon } from "../Icons";
import useCardsState from "@/context/CardStore";
import RND from "../RND";
import DragResizable from "../DragResizable";

export default function TestImgCard(props) {
   // const {id, src} = props;
   const { id } = props;
   // const [id, setId] = useState("fake_img_id");
   const [divScope, animate] = useAnimate();
   const dragControls = useDragControls();

   // const { initCards, select } = useUiStore();

   const { cards, updateSize, updatePosition } = useCardsState();
   const { size, aspect, src, position } = cards[id];
   const [show, setShow] = useState(false);

   useEffect(() => {
      animate(divScope.current, {
         x: position.left,
         y: position.top,
      });
   }, []);

   const handleResizeStop = (e, direction, ref, delta, position) => {
      const new_size = {
         width: pixelToNum(ref.style.width),
         height: pixelToNum(ref.style.height),
      };
      // setSize(new_size);
      updateSize(id, new_size);
   };

   function startDrag(e) {
      dragControls.start(e);
   }

   const handleDragEnd = (e, info) => {
      const { x, y } = info.offset;
      const { top, left } = position;
      const new_pos = {
         top: top + y,
         left: left + x,
      };

      updatePosition(id, new_pos);
   };

   const handleOnLoad = (e) => {
      setShow(true);
   };

   return (
      <motion.div
         ref={divScope}
         id={id}
         drag
         dragControls={dragControls}
         dragListener={false}
         dragMomentum={false}
         onDragEnd={handleDragEnd}
         className="absolute w-fit h-fit cursor-default overflow-hidden  p-1 bg-white rounded-[8px] drop-shadow-2xl "
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
            lockAspectRatio={aspect}
            // lockAspectRatio={true}
            minWidth="300px"
            maxWidth="1500px"
            minHeight="100px"
            maxHeight="2500px"
         >
            <span
               className="absolute top-2 right-4 scale-150 w-fit cursor-grab mix-blend-difference"
               onPointerDown={startDrag}
            >
               <DragIcon className="fill-white " />
            </span>

            <img
               id="testImage"
               src={src}
               alt="some_image"
               onLoad={handleOnLoad}
               className={`${show ? "block" : "hidden"}
               object-cover w-full h-full rounded-[6px] select-none`}
            />
         </Resizable>
      </motion.div>
   );
}
