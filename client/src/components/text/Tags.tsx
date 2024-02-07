/** @format */
import { useCallback, useState } from "react";

import { useCardStore } from "@/stores/cards";
import { useShallow } from "zustand/react/shallow";

import StaticCard from "@/components/cards/StaticCard";

import {
   Dialog,
   DialogContent,
   DialogTrigger,
   DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

const TagsMessage = () => {
   return (
      <p className="p-2 mx-2  bg-red-800/50 text-red-500/70 text-sm rounded-sm ring-[1px] ring-red-500/70 select-none">
         no more tags possible
      </p>
   );
};

const TagsManager = (props) => {
   const { id } = props;
   const { cards, setTag, removeTag } = useCardStore(
      useShallow((s) => ({
         cards: s.cards,
         setTag: s.setTag,
         removeTag: s.removeTag,
      }))
   );

   const { tags } = cards[id];

   const handleKeyDown = useCallback((e) => {
      if (e.key === "Enter") {
         setTag(id, e.target.value);
         setNewTag("");
         e.target.blur();
         return;
      }
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const formObj = Object.fromEntries(fd.entries());

      setTag(id, formObj.tag);
   };

   const handleDeleteTag = (item) => {
      removeTag(id, item);
   };

   //why useState ??
   const [newTag, setNewTag] = useState("");
   return (
      <form
         onSubmit={handleSubmit}
         className="flex-none ring-[1px] rounded-sm ring-neutral-800 bg-neutral-900 p-2 flex flex-col"
      >
         <div className="flex flex-col space-y-2 h-full">
            <input
               type="text"
               value={newTag}
               onChange={(e) => setNewTag(e.target.value)}
               placeholder={tags.length >= 3 ? ":)" : "enter new tag"}
               className="flex-none bg-neutral-950 placeholder:text-neutral-500 p-2 focus:outline-none ring-[1px] rounded ring-neutral-500 shadow"
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

export const Tags = (props) => {
   const { tags } = props;
   return (
      <div className="absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-fit flex space-x-1 text-sm justify-center grow py-1 ">
         {tags &&
            tags.map((item, index) => {
               return (
                  <span
                     key={index}
                     className=" -top-[4px] px-2 py-[3px] leading-none rounded-[8px]  bg-neutral-800"
                  >
                     {item}
                  </span>
               );
            })}
      </div>
   );
};

export const ManageTagsDialog = (props) => {
   const { id } = props;
   return (
      <DropdownMenuItem asChild>
         <Dialog>
            <DialogTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent ">
               manage tags
            </DialogTrigger>
            <DialogContent className="min-w-fit">
               <DialogTitle>Manage tags</DialogTitle>
               <div className=" flex flew-wrap space-x-2  h-full *:h-full ">
                  <StaticCard id={id} />
                  <TagsManager id={id} />
               </div>
            </DialogContent>
         </Dialog>
      </DropdownMenuItem>
   );
};
