/** @format */
import { useState } from "react";

import { Cross2Icon } from "@radix-ui/react-icons";
import useCardStore from "@/context/CardStore";

import {
   Dialog,
   DialogContent,
   DialogTrigger,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

import StaticCard from "../cards/StaticCard";

const TagsMessage = () => {
   return (
      <p className="p-2 mx-2  bg-red-800/50 text-red-500/70 text-sm rounded-sm ring-[1px] ring-red-500/70 select-none">
         no more tags possible
      </p>
   );
};

const TagsManager = (props) => {
   const { id } = props;
   const getSingleCard = useCardStore((state) => state.getSingleCard);
   const addTag = useCardStore((state) => state.addTag);
   const card = getSingleCard(id);
   const { tags } = card;
   const removeTag = useCardStore((state) => state.removeTag);

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

export const Tags = (props) => {
   const { tags } = props;
   return (
      <div className="absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-fit flex space-x-1 text-sm justify-center grow py-1 ">
         {tags &&
            tags.map((item, index) => {
               return (
                  <span className=" -top-[4px] px-2 py-[3px] leading-none rounded-[8px]  bg-neutral-800 text-white">
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
