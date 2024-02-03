/** @format */

import { motion } from "framer-motion";

import useCardStore from "@/context/CardStore";
import useUiStore from "@/context/UiStore";
import useInitBoard from "@/hooks/useInitBoard";

import CodeCard from "./cards/CodeCard";
import NoteCard from "./cards/NoteCard";
import MarkdownCard from "./cards/MarkdownCard";
import ImageCard from "./cards/ImageCard";
import BoardMessage from "./text/BoardMessage";
import InsertImageDialog from "./contextMenus/InsertImage";
import {
   ContextMenu,
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuTrigger,
} from "./ui/context-menu";

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
   const { cards } = useCardStore();
   const { zoom, setInsertImageX, setInsertImageY } = useUiStore();

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
      className: "focus:outline-none absolute z-10 ",
   };

   return (
      <>
         <ContextMenu>
            <ContextMenuTrigger className="w-full h-full relative p-0">
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
