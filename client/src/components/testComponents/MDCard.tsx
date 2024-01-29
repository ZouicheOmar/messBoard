/** @format */

import { useState, useCallback, useEffect } from "react";
import { distance2D, useDragControls, motion, useAnimate } from "framer-motion";
import { ResizeIcon, DragIcon } from "../Icons";

import { Resizable } from "re-resizable";
import { pixelToNum } from "@/utils/f&p";
import "easymde/dist/easymde.min.css";

import MDEditor, { commands } from "@uiw/react-md-editor/nohighlight";

import TestAnimationButton from "../TestAnimationButton";

const MDProps = {
   visibleDragbar: false,
   hideToolbar: true,
   fullscreen: false,
   //    commands: undefined,
   //    extraCommands: undefined,
   overflow: true,
};

const testprops = {
   className: "grow bg-inherit shadow-none",
   textareaProps: {
      className: "text-neutral-900 p-0 m-0 h-full",
      style: {
         fontFamily: "SF Pro Display, sans-serif",
      },
   },
   previewOptions: {
      className: "p-0 bg-transparent text-neutral-900",
      style: {
         fontFamily: "SF Pro Display, sans-serif",
      },
   },
};

const RMD = () => {
   const [text, setText] = useState("### Hi, Pluto!");
   const [edit, setEdit] = useState(false);

   const handleClick = () => {
      setEdit(!edit);
   };

   return (
      <>
         <MDEditor
            value={text}
            onChange={(value) => setText(value)}
            onWheel={(e) => {
               e.stopPropagation();
            }}
            preview={edit ? "edit" : "preview"}
            {...MDProps}
            {...testprops}
         />

         <TestAnimationButton
            variant="default"
            className="text-white absolute bottom-2 left-2"
            onClick={handleClick}
         >
            {" "}
            click{" "}
         </TestAnimationButton>
      </>
   );
};

export default function MDCard() {
   const [size, setSize] = useState({
      width: 500,
      height: 500,
   });
   // const [divScope, animate] = useAnimate();
   const dragControls = useDragControls();

   const handleRS = (e, direction, ref, delta, position) => {
      const new_size = {
         width: pixelToNum(ref.style.width),
         height: pixelToNum(ref.style.height),
      };
      setSize(new_size);
   };

   const handleDrag = (e) => {
      dragControls.start(e);
   };

   return (
      <motion.div
         // ref={divScope}
         // id={id}
         drag
         dragControls={dragControls}
         dragListener={false}
         dragMomentum={false}
         className="absolute -left-[130px] w-fit h-fit cursor-default  "
      >
         <Resizable
            size={size}
            onResizeStop={handleRS}
            minWidth="300px"
            maxWidth="1500px"
            minHeight="100px"
            maxHeight="2500px"
         >
            <span
               className="absolute top-2 right-4 scale-150 w-fit hover:cursor-grab"
               onPointerDown={handleDrag}
            >
               <DragIcon className="fill-neutral-900" />
            </span>
            <div className="flex flex-col gap-4 bg-orange-500 [box-shadow:0px_4px_0px_#c2410c] rounded-[8px] text-neutral-900  w-full h-full p-6">
               <div className="flex justify-start">
                  <span className="barcode-font text-5xl leading-none">
                     Markdown Editing
                  </span>
               </div>{" "}
               <RMD />
            </div>
         </Resizable>
      </motion.div>
   );
}
