/** @format */

import React, { useState, useEffect, RefObject, ReactNode } from "react";

import useCardsState from "@/context/CardStore";
import useUiStore from "@/context/UiStore";

import {
   useDragControls,
   motion,
   useAnimate,
   AnimatePresence,
} from "framer-motion";

import { Resizable } from "re-resizable";
import StaticCard from "./StaticCard";

import {
   Cross2Icon,
   CheckCircledIcon,
   CircleIcon,
} from "@radix-ui/react-icons";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";

import { Button } from "./ui/button";

import { DragIcon, ResizeIcon, ChevronIcon } from "./Icons";
import { ChevronDownIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { pixelToNum } from "@/utils/f&p";

type Coordinates = {
   top: number | string;
   left: number | string;
};

type Size = {
   width: number | string;
   height: number | string;
};

interface Props {
   coordinates: Coordinates;
   children: ReactNode;
   type: string;
   size: Size;
   board: RefObject<Element>;
   className: string;
   actions: string[];
   id: string;
}

const FocusButton = (props) => {
   const { id, rndId } = props;
   const { focus, focused } = useCardsState();
   const handleFocus = () => {
      if (focused) {
         focus(id, rndId);
      } else {
         focus(id, rndId);
      }
   };

   return (
      <span
         // className="hover:cursor-pointer absolute top-0 right-10"
         className="hover:cursor-pointer  top-0 right-10"
         onClick={handleFocus}
      >
         <CaretSortIcon className="fill-red-500  " />
      </span>
   );
};

const TagsMessage = () => {
   return (
      <p className="p-2 mx-2  bg-red-800/50 text-red-500/70 text-sm rounded-sm ring-[1px] ring-red-500/70 select-none">
         no more tags possible
      </p>
   );
};

const TagsManager = (props) => {
   const { id } = props;
   const getSingleCard = useCardsState((state) => state.getSingleCard);
   const addTag = useCardsState((state) => state.addTag);
   const card = getSingleCard(id);
   const { tags } = card;
   const removeTag = useCardsState((state) => state.removeTag);

   useEffect(() => {});

   const handleKeyDown = (e) => {
      if (e.key === "Enter") {
         addTag(id, e.target.value);
         setNewTag("");
         e.target.blur();
         return;
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // const form = e.target
      const fd = new FormData(e.target);
      const formObj = Object.fromEntries(fd.entries());

      addTag(id, formObj.tag);
   };

   const handleDeleteTag = (item) => {
      removeTag(id, item);
   };

   const [newTag, setNewTag] = useState("");
   return (
      <form onSubmit={handleSubmit} className="flex-none flex flex-col  ">
         <div
            id="right_side"
            className="bg-neutral-900 rounded-sm ring-[1px] ring-neutral-800 h-full flex flex-col  space-y-2 pb-2 "
         >
            <input
               type="text"
               value={newTag}
               onChange={(e) => setNewTag(e.target.value)}
               placeholder={tags.length >= 3 ? ":)" : "enter new tag"}
               className="flex-none bg-inherit placeholder:text-neutral-500 text-neutral-200 p-2 focus:outline-none focus:ring-[1px] rounded focus:ring-neutral-500"
               onKeyDown={handleKeyDown}
               name="tag"
               disabled={tags.length >= 3 ? true : false}
            />
            <ul className="grow p-0 ">
               {tags.map((item, index) => (
                  <li
                     key={index}
                     className="flex justify-between rounded px-2 py-1 hover:bg-neutral-900"
                  >
                     <span>{item}</span>
                     <span onClick={() => handleDeleteTag(item)}>
                        <Cross2Icon className=" h-full hover:bg-red-900 rounded-sm hover:stroke-red-500 hover:cursor-pointer" />
                     </span>
                  </li>
               ))}
            </ul>
            {tags.length >= 3 && <TagsMessage />}
            <Button
               type="submit"
               className="flex-none mx-2"
               disabled={tags.length >= 3 ? true : false}
            >
               Add
            </Button>
         </div>
      </form>
   );
};

const ManageTagsDialog = (props) => {
   const { id } = props;
   return (
      <DropdownMenuItem asChild>
         <Dialog>
            <DialogTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent ">
               manage tags
            </DialogTrigger>
            <DialogContent>
               <DialogTitle className="text-neutral-200">
                  Manage tags
               </DialogTitle>
               <DialogDescription asChild>
                  <div className=" flex flew-wrap space-x-2 text-neutral-200 w-[90%] h-full *:h-full ">
                     <StaticCard id={id} />
                     <TagsManager id={id} />
                  </div>
               </DialogDescription>
            </DialogContent>
         </Dialog>
      </DropdownMenuItem>
   );
};

const ManageShortcutsDialog = (props) => {
   const { id } = props;
   const addShortcut = useCardsState((state) => state.addShortcut);
   const [value, setValue] = useState("");
   const [hotkeyPreview, setHotkeyPreview] = useState(
      "No hotkey for this card yet"
   );

   const handleValueChange = (e) => {
      // console.log(e)
      setValue(e);
      addShortcut(id, e);
      if (value === "KeyQ") {
         setHotkeyPreview("ctrl + Q (ctrl + A if azerty)");
      } else if (value === "KeyW") {
         setHotkeyPreview("ctrl + W (ctrl + E if azerty)");
      } else if (value === "KeyE") {
         setHotkeyPreview("ctrl + E");
      }
   };

   return (
      <DropdownMenuItem asChild>
         <Dialog
            onOpenChange={(e) => {
               console.log("opened");
               const currentElem = e;
               console.log("current", currentElem);
            }}
         >
            <DialogTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent ">
               shortcut
            </DialogTrigger>
            <DialogContent>
               <DialogTitle className="text-neutral-200">
                  Add or remove shortcut
               </DialogTitle>
               <DialogDescription asChild>
                  <div className=" flex flex-col  gap-2 text-neutral-200 w-full h-full *:h-full ">
                     <div className="w-full ">
                        <span>
                           Bind a hotkey to this card, will focus on the code or
                           text area
                        </span>
                     </div>
                     <div className="flex justify-start items-center *:p-2">
                        <Select onValueChange={handleValueChange}>
                           <SelectTrigger className="flex-grow">
                              <SelectValue placeholder="Hotkeys" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="KeyQ" key="A">
                                 ctrl + Q ( ctrl + A if AZERTY )
                              </SelectItem>
                              <SelectItem value="KeyW">
                                 ctrl + W ( ctrl + Z if AZERTY )
                              </SelectItem>
                              <SelectItem value="KeyE">ctrl + E</SelectItem>
                              <SelectItem value="null">None</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>
               </DialogDescription>
            </DialogContent>
         </Dialog>
      </DropdownMenuItem>
   );
};

const CardDragIcon = (props) => {
   const { action } = props;
   return (
      <span onPointerDown={action} className="hover:cursor-grab ">
         <DragIcon className="fill-neutral-500 hover:fill-neutral-400 " />{" "}
      </span>
   );
};

const CardDropDownMenu = (props) => {
   const { id } = props;
   const deleteCard = useCardsState((state) => state.deleteCard);
   const handleDeleteClick = () => deleteCard(id);

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild className="bg-none">
            <ChevronDownIcon className="fill-neutral-500 hover:fill-neutral-400 hover:cursor-pointer  " />
         </DropdownMenuTrigger>
         <DropdownMenuContent
            side="bottom"
            align="end"
            className="bg-neutral-900  text-ms dark:text-white  mr-1 w-30"
         >
            <DropdownMenuItem onClick={handleDeleteClick}>
               delete
            </DropdownMenuItem>
            <ManageTagsDialog id={id} />
            <ManageShortcutsDialog id={id} />
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

const CardHotKeys = (props) => {
   const { id, hotkey } = props;

   return (
      <span className="h-fit p-0 mt-[1px] leading-[0.9rem] text-[0.8rem] text-neutral-600">
         {hotkey.slice(hotkey.length - 1)}
      </span>
   );
};

const CardSelectIcon = (props) => {
   const { id } = props;
   const { uiCards, select, toggleSelectCard } = useUiStore();

   const handleSelect = (e) => {
      e.stopPropagation();
      toggleSelectCard(id);
   };

   return (
      <AnimatePresence>
         {select && (
            <motion.span
               onPointerDownCapture={handleSelect}
               className="self-end"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
            >
               {uiCards[id]?.selected ? <CheckCircledIcon /> : <CircleIcon />}
            </motion.span>
         )}
      </AnimatePresence>
   );
};

const CardTopIcons = (props) => {
   const { id, hotkey, action } = props;
   const { uiCards, select, toggleSelectCard } = useUiStore();

   //    const select = useUiStore((state) => state.select);
   //    const toggleSelectCard = useUiStore((state) => state.toggleSelectCard);

   return (
      <>
         <div className="absolute top-0 right-1 flex justify-start items-center gap-1 h-fit w-fit">
            <CardHotKeys id={id} hotkey={hotkey} />
            <FocusButton id={id} rndId={id + "-rnd"} />
            <CardSelectIcon id={id} />
            <CardDropDownMenu id={id} />
            <CardDragIcon action={action} />
         </div>
      </>
   );
};

//limit by 3 tags
//limit tags to 10 characters
//limit total carachters to 30

/**
 * Then : Add a "more" button, showing all the tags in a modal
 */

const Tags = ({ tags }) => {
   return (
      <div className="w-full  flex space-x-1 justify-center relative grow py-1 ">
         {tags &&
            tags.map((item, index) => {
               return (
                  <Badge
                     key={index}
                     variant="outline"
                     className=" bg-secondary text-neutral-400  "
                  >
                     {item}
                  </Badge>
               );
            })}
      </div>
   );
};

const CardBottomIcons = ({ tags, id }) => {
   const { cards, toggleFoldCard } = useCardsState();

   return (
      <div className="relative flex-none w-full flex  justify-between items-end bg-none rounded-b  h-7">
         <button
            id={id}
            className={`max-h-fit max-w-fit flex-none  hover:cursor-pointer transition-transform duration-100
                ${cards[id].folded ? "rotate-180" : "rotate-0"}
                
                `}
            onClick={() => toggleFoldCard(id)}
         >
            <ChevronIcon className="fill-neutral-500 hover:fill-neutral-400 " />{" "}
         </button>
         <Tags tags={tags} />

         <ResizeIcon className="scale-75 flex-none fill-neutral-600" />
      </div>
   );
};

const SelectHiddenRectangle = (props) => {
   const { select, uiCards, toggleSelectCard } = useUiStore();
   const { id } = props;

   const [selected, setSelected] = useState(false);
   const [selectStyle, setSelectStyle] = useState("");
   const handleSelect = (e) => {
      e.stopPropagation();
      setSelected(true);
      if (uiCards[id].selected) {
         setSelectStyle("");
      } else {
         setSelectStyle(
            "ring-[2px] bg-indigo-500/20 ring-indigo-500 rounded-[6px]"
         );
      }
      toggleSelectCard(id);
      setTimeout(() => {
         setSelected(false);
      }, 700);
   };

   return (
      select && (
         <div
            id={id + "-select"}
            className={`absolute z-10 w-full h-full transition-colors duration-400 ${
               selected && selectStyle
            }`}
            onClick={handleSelect}
         ></div>
      )
   );
};

const DragResizable: React.FC<Props> = (props) => {
   const { children, id } = props;
   const [divScope, animate] = useAnimate();
   const dragControls = useDragControls();

   const { initCards, select } = useUiStore();
   const { cards, updateSize, putOnTop, updateFolded, updatePosition } =
      useCardsState();

   const card = cards[id];
   const { position, shortcut: hotkey, tags, folded, size } = card;

   useEffect(() => {
      //got to remove this
      initCards();
      animate(divScope.current, {
         x: position.left,
         y: position.top,
      });
   }, [select]);

   function startDrag(event) {
      dragControls.start(event);
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

   const handleResizeStop = (e, direction, ref, delta, position) => {
      const new_size = {
         width: pixelToNum(ref.style.width),
         height: pixelToNum(ref.style.height),
      };

      updateSize(id, new_size);
      updateFolded(id, false);
   };

   const handleBringToTop = (e) => {
      e.stopPropagation();
      putOnTop(id);
   };

   return (
      <>
         <motion.div
            ref={divScope}
            id={id}
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            className="absolute w-fit h-fit cursor-default "
            onClick={handleBringToTop}
            onDoubleClick={handleBringToTop}
            onDragStart={handleBringToTop}
            onDragEnd={handleDragEnd}
         >
            <Resizable
               id={id + "-rnd"}
               size={
                  folded
                     ? {
                          width: size.width,
                          height: 56,
                       }
                     : size
               }
               onResizeStop={handleResizeStop}
               enable={{
                  bottom: true,
                  bottomRight: true,
                  right: true,
               }}
               minWidth="300px"
               maxWidth="1500px"
               minHeight="56px"
               maxHeight="2500px"
            >
               <SelectHiddenRectangle id={id} />
               <div
                  id="trigger"
                  className={` w-full select-none h-full flex flex-col fade-in slide-in-from-top-5 duration-300 ring-[1px] bg-slate-950 ring-[#25282c] rounded-[6px]`}
               >
                  {children}
                  <CardTopIcons id={id} hotkey={hotkey} action={startDrag} />
                  <CardBottomIcons tags={tags} id={id} />
               </div>
            </Resizable>
         </motion.div>
      </>
   );
};

export default DragResizable;
