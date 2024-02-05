/** @format */

import { useState } from "react";

import useCardStore from "@/stores/CardStore";
import useUiStore from "@/stores/UiStore";

import { AnimatePresence, motion } from "framer-motion";
import RND from "./components/RND";
import {
   ContextMenu,
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuTrigger,
} from "../ui/context-menu";
import {
   Dialog,
   DialogContent,
   DialogTrigger,
   DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectCheckbox } from "@/components/cards/components/TopIcons";

const AddTitleDialog = (props) => {
   return (
      <>
         <DialogTrigger asChild>
            <ContextMenuItem className="focus:bg-neutral-700 rounded-none">
               add or change title
            </ContextMenuItem>
         </DialogTrigger>
      </>
   );
};

const CardContextMenu = (props) => {
   const { id, showTitleState } = props;
   const { cards, deleteCard, updateTitle } = useCardStore();

   const { title } = cards[id];
   const { setShowTitle } = showTitleState;

   const handlePointerDown = () => {
      setTimeout(() => {
         setShowTitle(true);
      }, 100);
      setTimeout(() => {
         setShowTitle(false);
      }, 10000);
   };

   return (
      <>
         <ContextMenuContent className="p-0 gap-0 text-sm overflow-hidden w-40">
            <AddTitleDialog />
            <ContextMenuItem
               onSelect={(e) => deleteCard(id)}
               className="focus:bg-neutral-800 rounded-none"
            >
               delete image
            </ContextMenuItem>
            <ContextMenuItem
               disabled
               className="focus:bg-neutral-800 rounded-none"
            >
               fix position
            </ContextMenuItem>
         </ContextMenuContent>
         <DialogContent className="w-1/2 flex justify-center">
            <div className="flex flex-col gap-2 w-full ">
               <span>Enter a new title</span>
               <Input
                  value={title}
                  onChange={(e) => updateTitle(e, id)}
                  placeholder="title"
               />
               <DialogClose asChild>
                  <Button
                     onPointerDown={handlePointerDown}
                     onClick={handlePointerDown}
                  >
                     save
                  </Button>
               </DialogClose>
            </div>
         </DialogContent>
      </>
   );
};

const Title = (props) => {
   const { showTitle, title } = props;

   return (
      <AnimatePresence>
         {showTitle && (
            <motion.span
               initial={{ y: -5, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -5, opacity: 0 }}
               transition={{ duration: 0.1 }}
               className="absolute -bottom-[8px] left-[4px] px-2 py-0 rounded-[8px] text-sm bg-slate-900/95 text-white"
            >
               {title}
            </motion.span>
         )}
      </AnimatePresence>
   );
};

export default function ImageCard(props) {
   const { id } = props;
   const { cards, putOnTop } = useCardStore();
   const { title } = cards[id];
   const { uiCards, select } = useUiStore();

   const [show, setShow] = useState(false);
   const [showTitle, setShowTitle] = useState(false);

   const handleOnLoad = () => setShow(true);

   const displayTitle = (e, duration = 3000) => {
      if (showTitle === false) {
         setShowTitle(true);
         setTimeout(() => {
            setShowTitle(false);
         }, duration);
         return;
      } else {
         return;
      }
   };

   const handlePointerDown = () => {
      putOnTop(id);
   };

   return (
      <RND id={id}>
         <Dialog>
            <ContextMenu>
               <ContextMenuTrigger>
                  <div
                     className={`w-full h-full p-1 ${
                        select && uiCards[id].selected && "bg-indigo-500 "
                     }
                      rounded-[8px]  bg-neutral-300 transition-all duration-100`}
                     onPointerEnter={displayTitle}
                     onPointerDown={handlePointerDown}
                  >
                     <img
                        id={`${id}-image`}
                        src={`http://localhost:${
                           import.meta.env.VITE_PORT
                        }/${id}`}
                        alt={title || "image card"}
                        onLoad={handleOnLoad}
                        className={`${show ? "block" : "hidden"}
                  object-cover w-full h-full rounded-[6px] select-none`}
                     />
                     <SelectCheckbox
                        id={id}
                        className="bg-neutral-800  p-[1.5px] rounded-sm bg-blend-difference absolute z-50 top-6 right-[14px]"
                     />
                     <Title title={title} showTitle={showTitle} />
                  </div>
               </ContextMenuTrigger>
               <CardContextMenu
                  id={id}
                  showTitleState={{ showTitle, setShowTitle }}
               />
            </ContextMenu>
         </Dialog>
      </RND>
   );
}
