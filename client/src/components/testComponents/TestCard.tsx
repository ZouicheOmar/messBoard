/** @format */

import { useState } from "react";
import {
   distance2D,
   useDragControls,
   motion,
   animate,
   useAnimate,
} from "framer-motion";
import { ResizeIcon, DragIcon } from "../Icons";
import useUiStore from "@/context/UiStore";
import DragResizable from "../DragResizable";

import { Resizable } from "re-resizable";
import TestAnimationButton from "../TestAnimationButton";
import { pixelToNum } from "@/utils/f&p";
import { cn } from "@/utils";

const ResizeButton = (props) => {
   const { mx, my } = useUiStore();
   const { w, h, setW, setH } = props.size;

   const [resizeMode, setResizeMode] = useState(false);
   const hPointerDown = (e) => {
      console.log(e);
      const newW = w + mx;
      const newH = h + my;
      setW(newW);
      setH(newH);
      setResizeMode(true);
   };
   const hPointerMove = (e) => {
      if (resizeMode) {
         const newW = w + mx;
         const newH = h + my;
         setW(newW);
         setH(newH);
      }
      console.log(mx, my);
   };
   const hPointerUp = (e) => {
      setResizeMode(false);
      console.log(e);
   };
   return (
      <span
         className="absolute bottom-0 right-0"
         onPointerDown={hPointerDown}
         onPointerMove={hPointerMove}
         onPointerUp={hPointerUp}
      >
         <ResizeIcon className="fill-neutral-700 hover:fill-neutral-400 transition-colors hover:cursor-pointer" />
      </span>
   );
};

const DragButton = (props) => {
   const { dragControls } = props;

   const handleClick = (e) => {
      e.stopPropagation();
      console.log(e);
      dragControls.start(e);
   };
   return (
      <span
         id="dragButton"
         className="absolute z-10 -top-1 right-0"
         onPointerDown={handleClick}
      >
         <DragIcon className="fill-neutral-700 hover:fill-neutral-400 transition-colors hover:cursor-pointer" />
      </span>
   );
};

// export default function TestCard() {
//     const [w, setW] = useState(160)
//     const [h, setH] = useState(80)

//     const dragControls = useDragControls()

//     return (
//         <motion.div
//             drag
//             dragControls={dragControls}
//             dragMomentum={false}
//             dragListener={false}
//             style={{
//                 width: w,
//                 height: h,
//             }}
//             className="absolute z-0 bg-slate-800 border-[1px] border-neutral-500"
//         >
//             <DragButton dragControls={dragControls} />
//             <ResizeButton size={{w, setW, h, setH}} />
//         </motion.div>
//     )
// }

export const Text = () => (
   <p className="text-start leading-none text-pretty">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae culpa
      eligendi veniam. Similique, officia deserunt? Rem nihil laborum earum
      voluptatem officia dolore quas reiciendis rerum impedit dolores, ipsum
      repellat et. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
      culpa eligendi veniam. Similique, officia deserunt?
      <br />
      <br />
      Rem nihil laborum earum voluptatem officia dolore quas reiciendis rerum
      impedit dolores, ipsum repellat et. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Quae culpa eligendi veniam. Similique, officia deserunt?
      Rem nihil laborum earum voluptatem officia dolore quas reiciendis rerum
      impedit dolores, ipsum repellat et.
      <br />
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae culpa
      eligendi veniam. Similique, officia deserunt? Rem nihil laborum earum
      voluptatem officia dolore quas reiciendis rerum impedit dolores, ipsum
      repellat et.
   </p>
);

export function TestFlatCard() {
   const [size, setSize] = useState({
      width: 500,
      height: 500,
   });
   const [divScope, animate] = useAnimate();
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
         ref={divScope}
         // id={id}
         drag
         dragControls={dragControls}
         dragListener={false}
         dragMomentum={false}
         className="absolute left-[320px] w-fit h-fit cursor-default "
      >
         <Resizable
            size={size}
            onResizeStop={handleRS}
            minWidth="300px"
            maxWidth="1500px"
            minHeight="56px"
            maxHeight="2500px"
         >
            <span
               className="absolute top-2 right-4 scale-150 w-fit hover:cursor-grab"
               onPointerDown={handleDrag}
            >
               <DragIcon className="fill-neutral-900" />
            </span>
            <div className="flex flex-col gap-4 bg-yellow-500 [box-shadow:0px_4px_0px_#ca8a04] rounded-[8px] text-neutral-900  w-full h-full p-6">
               <div className="flex justify-start">
                  <span className="barcode-font text-5xl leading-none">
                     Flat Card
                  </span>
               </div>{" "}
               <div className="">
                  <Text />
               </div>
            </div>
         </Resizable>
      </motion.div>
   );
}

export function TestCard() {
   const [size, setSize] = useState({
      width: 300,
      height: 300,
   });
   const [divScope, animate] = useAnimate();
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
         ref={divScope}
         // id={id}
         drag
         dragControls={dragControls}
         dragListener={false}
         dragMomentum={false}
         className="absolute w-fit h-fit cursor-default "
      >
         <Resizable
            size={size}
            onResizeStop={handleRS}
            minWidth="300px"
            maxWidth="1500px"
            minHeight="56px"
            maxHeight="2500px"
            enable={{
               bottom: true,
               bottomRight: true,
               right: true,
            }}
         >
            <div className="w-full h-full bg-neutral-900 p-2 rounded-[10px]">
               <div className="flex flex-col bg-neutral-800 p-6 rounded-[6px] overflow-hidden gap-4 border-neutral-300 text-neutral-100  relative w-full h-full ">
                  <span
                     className="absolute top-2 right-4 scale-150 w-fit hover:cursor-grab"
                     onPointerDown={handleDrag}
                  >
                     <DragIcon className="fill-neutral-300" />
                  </span>
                  <div className="flex justify-start">
                     <span className="barcode-font  text-2xl  leading-none">
                        Test Card
                     </span>
                  </div>
                  <div className="">
                     <Text />
                  </div>
               </div>
            </div>
         </Resizable>
      </motion.div>
   );
}

export function TestRoundedCard() {
   const [size, setSize] = useState({
      width: 300,
      height: 300,
   });
   const [divScope, animate] = useAnimate();
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
         ref={divScope}
         drag
         dragControls={dragControls}
         dragListener={false}
         dragMomentum={false}
         className="absolute top-[400px] -left-[100px] w-fit h-fit cursor-default "
      >
         <Resizable
            size={size}
            onResizeStop={handleRS}
            minWidth="300px"
            maxWidth="1500px"
            minHeight="56px"
            maxHeight="2500px"
            enable={{
               bottom: true,
               bottomRight: true,
               right: true,
            }}
         >
            <div className="flex flex-col bg-neutral-700 rounded-[8px] [box-shadow:0px_4px_0px_#171717] p-6 overflow-hidden gap-4 border-neutral-300 text-neutral-100  relative w-full h-full ">
               <span
                  className="absolute top-2 right-4 scale-150 w-fit hover:cursor-grab"
                  onPointerDown={handleDrag}
               >
                  <DragIcon className="fill-neutral-300 hover:fill-neutral-100 transition-colors" />
               </span>
               <div className="flex justify-start">
                  <span className="text-2xl  font-semibold leading-none goodmonolith-font">
                     Test Rounded Card
                  </span>
               </div>
               <div className="">
                  <Text />
               </div>
            </div>
         </Resizable>
      </motion.div>
   );
}
