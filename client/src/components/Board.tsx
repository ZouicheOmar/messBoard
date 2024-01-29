/** @format */

import "../App.css";
import { useEffect } from "react";

import BoardMessage from "./BoardMessage";
import CodeCard from "./CodeCard";
import NoteCard from "./NoteCard";
import { motion } from "framer-motion";

import {
   ContextMenu,
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuTrigger,
} from "./ui/context-menu";

import useCardStore from "@/context/CardStore";
import useUiStore from "@/context/UiStore";
import useKeyDown from "@/utils/handleKeyDown";

import InsertImageDialog from "./InsertImage";
import MarkdownCard from "./MarkdownCard";
import ImageCard from "./ImageCard";

const BoardContextMenu = () => {
   const { addNoteCard, addCodeCard, addMDCard } = useCardStore();

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

function Board() {
   const { cards, file_name } = useCardStore();
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
      setInsertImageX(e.nativeEvent.clientX);
      setInsertImageY(e.nativeEvent.clientY);
   };

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
                  <BoardMessage />
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
