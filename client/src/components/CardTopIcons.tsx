/** @format */

import { useState } from "react";
import useCardStore from "@/context/CardStore";
import useUiStore from "@/context/UiStore";
import { ManageTagsDialog } from "./Tags";

import { motion, AnimatePresence } from "framer-motion";

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

import {
   ChevronDownIcon,
   CaretSortIcon,
   CircleIcon,
   CheckCircledIcon,
} from "@radix-ui/react-icons";

const DropDownMenu = (props) => {
   const { id } = props;
   const deleteCard = useCardStore((state) => state.deleteCard);
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

export const SelectCheckbox = ({ className, id, ...props }) => {
   // const { id } = props;
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
               // className="self-end"
               className={className}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
            >
               {uiCards[id]?.selected ? (
                  <CheckCircledIcon className="animate-in fade-in-50 duration-300 stroke-indigo-500" />
               ) : (
                  <CircleIcon className="animate-in fade-in-50 duration-1000" />
               )}
            </motion.span>
         )}
      </AnimatePresence>
   );
};

const Shortcut = (props) => {
   const { hotkey } = props;

   return (
      <span className="h-fit p-0 mt-[1px] leading-[0.9rem] text-[0.8rem] text-neutral-600">
         {hotkey.slice(hotkey.length - 1)}
      </span>
   );
};

const FocusButton = (props) => {
   const { id, rndId } = props;
   const { focus, focused } = useCardStore();
   const handleFocus = () => {
      if (focused) {
         focus(id, rndId);
      } else {
         focus(id, rndId);
      }
   };

   return (
      <span
         className="hover:cursor-pointer  top-0 right-10"
         onClick={handleFocus}
      >
         <CaretSortIcon className="active:stroke-indigo-500 transition-colors duration-300" />
      </span>
   );
};

const ManageShortcutsDialog = (props) => {
   const { id } = props;
   const addShortcut = useCardStore((state) => state.addShortcut);
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

export default function TopIcons(props) {
   const { id } = props;
   const { cards } = useCardStore();
   const { shortcut } = cards[id];

   return (
      <>
         <div className="absolute top-2 right-10 flex justify-start items-center gap-1 h-fit w-fit">
            <Shortcut hotkey={shortcut} />
            <FocusButton id={id} rndId={id + "-rnd"} />
            <SelectCheckbox id={id} />
            <DropDownMenu id={id} />
         </div>
      </>
   );
}
