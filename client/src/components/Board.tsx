/** @format */

import { useShallow } from "zustand/react/shallow";

import { useCardStore } from "@/stores/cards";
import useUiStore from "@/stores/UiStore";

import useInitBoard from "@/hooks/useInitBoard";

import { motion } from "framer-motion";

import CodeCard from "./cards/CodeCard";
import NoteCard from "./cards/NoteCard";
import MarkdownCard from "./cards/MarkdownCard";
import ImageCard from "./cards/ImageCard";
import BoardMessage from "./text/BoardMessage";
import { BoardContextMenu } from "./contextMenus/BoardContextMenu";
import { ContextMenu, ContextMenuTrigger } from "./ui/context-menu";

function Board() {
   const cards = useCardStore((s) => s.cards);
   const { zoom, setInsertImageX, setInsertImageY } = useUiStore(
      useShallow((s) => ({
         zoom: s.zoom,
         setInsertImageX: s.setInsertImageX,
         setInsertImageY: s.setInsertImageY,
      }))
   );

   useInitBoard();

   const handleOpenChange = (e) => {
      setInsertImageX(e.nativeEvent.clientX);
      setInsertImageY(e.nativeEvent.clientY);
   };

   const boardMotionDivProps = {
      onPointerDown: handleOpenChange,
      id: "board",
      tabIndex: -1,
      animate: {
         scale: zoom,
      },
      transition: {
         // type: "",
         ease: "anticipate",
         delay: 0,
         duration: 0,
      },
      className: "focus:outline-none absolute z-10 pointer-events-auto",
   };

   return (
      <>
         <ContextMenu>
            <ContextMenuTrigger
               id="boardWrapper"
               className="w-full h-full relative p-0"
            >
               <motion.div {...boardMotionDivProps}>
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
               <BoardContextMenu />
            </ContextMenuTrigger>
         </ContextMenu>
      </>
   );
}

export default Board;
