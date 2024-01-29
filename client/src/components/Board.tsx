/** @format */

import "../App.css";
import { useEffect, useState, useRef } from "react";

import CodeCard from "./CodeCard";
import NoteCard from "./NoteCard";
import { motion, AnimatePresence } from "framer-motion";

import {
   ContextMenu,
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuTrigger,
} from "./ui/context-menu";

import useCardsState from "@/context/CardStore";
import useUiStore from "@/context/UiStore";
import useKeyDown from "@/utils/handleKeyDown";

import InsertImageDialog from "./InsertImage";
import MarkdownCard from "./MarkdownCard";
import ImageCard from "./ImageCard";

const CONTEXT_MENU_ITEM_STYLE =
   " justify-between px-2 py-1 rounded-none focus:bg-neutral-700";

const BoardContextMenu = () => {
   const { addNoteCard, addCodeCard, addMDCard } = useCardsState();

   return (
      <ContextMenuContent className="p-0 gap-0 overflow-hidden w-40">
         <ContextMenuItem
            className="focus:bg-neutral-800 rounded-none"
            onSelect={addNoteCard}
         >
            <span>add note</span>
         </ContextMenuItem>
         <ContextMenuItem
            className="focus:bg-neutral-800 rounded-none"
            onSelect={addCodeCard}
         >
            <span>add code</span>
         </ContextMenuItem>
         <ContextMenuItem
            className="focus:bg-neutral-800 rounded-none"
            onSelect={addMDCard}
         >
            <span>add markdown</span>
         </ContextMenuItem>
         <ContextMenuItem asChild>
            <InsertImageDialog />
         </ContextMenuItem>
      </ContextMenuContent>
   );
};

const EmptyBoardMessage = () => {
   const { cards, message, setMessage, file_name } = useCardsState();

   useEffect(() => {
      if (Object.entries(cards).length === 0) {
         setMessage("no cards");
      } else {
         setMessage("");
      }
   }, [cards]);

   return (
      <AnimatePresence>
         {message !== "" && (
            <motion.div
               className="absolute flex justify-start w-[20rem]"
               initial={{ x: -10, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: -10, opacity: 0 }}
               transition={{ duration: 0.3 }}
            >
               <p className="text-sm text-start w-fit ">
                  {`Current board : ${file_name}`}
                  <br />
                  {message}
               </p>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

function Board() {
   const { cards, file_name } = useCardsState();
   const { initCards, zoom, setInsertImageX, setInsertImageY } = useUiStore();

   const handleKeyDown = useKeyDown();

   useEffect(() => {
      initCards();

      const handleBeforeUnload = () => {
         setTimeout(() => {
            localStorage.setItem("last_file", file_name);
         }, 0);
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("keydown", handleKeyDown);

      return () => {
         window.removeEventListener("beforeunload", handleBeforeUnload);
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, [file_name]);

   const handleOpenChange = (e) => {
      // e.stopPropagation();
      // e.preventDefault();
      setInsertImageX(e.nativeEvent.clientX);
      setInsertImageY(e.nativeEvent.clientY);
   };

   /**
    * TODO :
    * classic .txt cards can be set in any colors,
    * markdown cards only on dark background
    */

   const boardMotionDivProps = {
      id: "board",
      tabIndex: -1,
      animate: {
         scale: zoom,
      },
      className: "focus:outline-none absolute ",
   };

   return (
      <>
         <ContextMenu>
            <ContextMenuTrigger className="w-full h-full relative p-0">
               <motion.div
                  onPointerDown={handleOpenChange}
                  onKeyDownCapture={handleKeyDown}
                  {...boardMotionDivProps}
               >
                  <EmptyBoardMessage />
                  {cards &&
                     Object.keys(cards).map((item) => {
                        if (cards[item].type === "note") {
                           return (
                              <NoteCard
                                 key={cards[item].id}
                                 data={cards[item]}
                              />
                           );
                        } else if (cards[item].type === "code") {
                           return (
                              <CodeCard
                                 key={cards[item].id}
                                 data={cards[item]}
                              />
                           );
                        } else if (cards[item].type === "markdown") {
                           return (
                              <MarkdownCard
                                 key={cards[item].id}
                                 card={cards[item]}
                                 id={cards[item].id}
                              />
                           );
                        } else if (cards[item].type === "image") {
                           return (
                              <ImageCard
                                 key={cards[item].id}
                                 id={cards[item].id}
                              />
                           );
                        } else {
                           return <></>;
                        }
                     })}
               </motion.div>
            </ContextMenuTrigger>
            <BoardContextMenu />
         </ContextMenu>
      </>
   );
}

export default Board;
