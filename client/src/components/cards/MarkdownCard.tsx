/** @format */
import { useCallback, useState } from "react";
import { useCardStore } from "@/stores/cards";
import { useShallow } from "zustand/react/shallow";

import MDEditor from "@uiw/react-md-editor/nohighlight";
import RND from "@/components/cards/components/RND";

import { SelectCheckbox } from "./components/TopIcons";

import { CodeIcon, ReaderIcon } from "@radix-ui/react-icons";
import { animate } from "framer-motion";

const MDProps = {
   visibleDragbar: false,
   hideToolbar: true,
   fullscreen: false,
   overflow: true,
   className: "grow bg-inherit shadow-none",
   textareaProps: {
      className:
         "text-neutral-900 p-0 m-0 h-full active:ring-[1px] active:ring-inset active:ring-black bg-white/25 animate-in duration-700 ",
      style: {
         fontFamily: "SF Pro Display, sans-serif",
      },
   },
   previewOptions: {
      className: "p-0 bg-transparent text-neutral-900 text-sm",
      style: {
         fontFamily: "SF Pro Display, sans-serif",
      },
   },
};

const Body = (props) => {
   const [edit, setEdit] = useState(false);

   const { card } = props;
   const { id, data, size } = card;
   const { setData, writeThisFile, setSize } = useCardStore(
      useShallow((s) => ({
         setData: s.setData,
         writeThisFile: s.writeThisFile,
         setSize: s.setSize,
      }))
   );

   const handleDoubleClick = (e) => {
      e.stopPropagation();
      !edit && setEdit(!edit);
   };

   const handleClick = (e) => {
      console.log("size", size);
      e.stopPropagation();
      edit && writeThisFile(false);
      if (!edit && size.height <= 200) {
         const editModeSize = { ...size, height: 230 };
         setSize(id, editModeSize);
         const rndId = id + "-rnd";
         const cardEl = document.getElementById(rndId);
         animate(
            cardEl,
            {
               ...editModeSize,
            },
            {
               duration: 0.3,
            }
         );
      }
      setEdit(!edit);
   };

   const handleChange = useCallback((value) => {
      setData(id, value);
   }, []);

   const handleBlur = (e) => {
      setData(id, e.target.value);
      // setEdit(false);
   };

   return (
      <>
         <MDEditor
            value={data}
            onChange={handleChange}
            onWheel={(e) => {
               e.stopPropagation();
            }}
            onBlur={handleBlur}
            onDoubleClick={handleDoubleClick}
            preview={edit ? "edit" : "preview"}
            {...MDProps}
         />

         <span
            className=" absolute bottom-2 left-2 border-[1px] border-neutral-700/30 rounded-[2px] py-0 px-1 cursor-pointer [box-shadow:0px_1px_0px_#7B7B7B] active:translate-y-[1px] active:shadow-none duration-150"
            onPointerDown={handleClick}
         >
            {edit ? <ReaderIcon /> : <CodeIcon />}
         </span>
      </>
   );
};

export default function MarkdownCard(props) {
   const { card } = props;
   const { id } = card;

   return (
      <>
         <RND id={id}>
            <div className="flex flex-col gap-2  bg-[#EEEEEE] [box-shadow:0px_4px_0px_#7B7B7B] rounded-[8px] text-neutral-900  w-full h-full p-4 pb-9">
               <SelectCheckbox
                  id={id}
                  className="absolute z-50 top-6 right-4"
               />
               <Body card={card} />
            </div>
         </RND>
      </>
   );
}
