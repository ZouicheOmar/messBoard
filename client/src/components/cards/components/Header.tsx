/** @format */

import { useCallback } from "react";
import useCardStore from "@/context/CardStore";

import { cva } from "class-variance-authority";
import { cn } from "@/utils/twMerge";

const variants = cva(
   "w-full flex justify-between flex-none border-none [&>input]:border-none [&>input]:bg-inherit [&>input:focus]:ring-[1px] [&>input]:transition-colors [&>input]:duration-300 [&>input]:overflow-scroll [&>input]:resize-none [&>input:focus]:outline-none [&>input]:select-none",
   {
      variants: {
         variant: {
            default:
               "h-7  pl-1 pt-2 focus:bg-neutral-700/25 focus:ring-indigo-500  [&>input]:w-[235px]  [&>input]:pl-1 [&>input]:pr-6 [&>input:focus]:ring-indigo-500 [&>input]:text-sm [&>input:focus]:bg-neutral-700/25 ",
            markdown:
               "goodmonolith-font [&>input]:text-xl leading-none [&>input:focus]:ring-indigo-500 [&>input:focus]:bg-white/20",
            noteAndCode:
               "h-7 pl-1 pt-2 focus:bg-neutral-700/25 focus:ring-indigo-500  [&>input]:w-[235px]  [&>input]:pl-1 [&>input]:pr-6 [&>input:focus]:ring-indigo-500 [&>input]:text-sm [&>input:focus]:bg-neutral-700/25 ",
            code: "",
            image: "",
         },
         size: {
            default: "pl-1 w-[235px] pr-6",
            markdown: "pr-6 w-full [&>input]:w-full ",
            noteAndCode: "pl-1 w-[235px] pr-6",
            image: "",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
      },
   }
);

export default function CardHeader(props) {
   const { id, title, className, variant, size } = props;
   const { updateTitle, writeThisFile } = useCardStore();

   const handleTitleChange = useCallback((e) => {
      updateTitle(e, id);
   }, []);

   const handleKeyDown = useCallback((e) => {
      if (["Enter", "Escape"].includes(e.code)) {
         e.target.blur();
      }
   }, []);

   return (
      //   <div className ="w-full h-7 flex-none pl-1 [&>input]:focus:outline-none [&>input]:w-[235px] [&>input]:duration-300 [&>input]:pl-1 [&>input]:pr-6 [&>input]:text-sm [&>input]:resize-none [&>input]:select-none [&>input]:border-none [&>input]:overflow-scroll  [&>input]:transition-colors pt-2 flex justify-between [&>input]:bg-inherit [&>input]:focus:ring-[1px] [&>input]:focus:ring-indigo-500 [&>input:focus]:bg-neutral-700/25" >

      <div className={cn(variants({ variant, size, className }))}>
         <input
            type="text"
            name="title"
            // className="  "
            size={10}
            value={title}
            onKeyDown={handleKeyDown}
            onChange={handleTitleChange}
            placeholder={title || "title"}
            onBlur={() => writeThisFile(false)}
         />
      </div>
   );
}
