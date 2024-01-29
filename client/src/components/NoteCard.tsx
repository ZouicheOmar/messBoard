/** @format */

import useCardsState from "@/context/CardStore";

import RND from "./RND";
import CardHeader from "./CardHeader";
import TopIcons from "./CardTopIcons";
import BottomIcons from "./CardBottomIcons";

const Body = (props) => {
   const { card } = props;
   const { id, data } = card;
   const { updateData, writeThisFile, setActive } = useCardsState();

   const handleChange = (e) => {
      updateData(id, e.target.value);
   };

   const handleKeyDown = (e) => {
      if ((e.code === "Enter" && e.shiftKey) || e.code === "Escape") {
         updateData(id, e.target.value);
         e.target.blur();
      }
   };

   const handleBlur = (e) => {
      updateData(id, e.target.value);
      writeThisFile(false);
   };

   const stopPropagation = (e) => e.stopPropagation();

   const handleFocus = (e) => {
      setActive(id);
   };

   return (
      <div className="grow nondrag max-h-full min-h-0 px-1 pt-1 rounded-[6px] flex text-sm">
         <textarea
            className="w-full resize-none bg-inherit px-1 pt-1  focus:bg-neutral-700/25 transition-colors  duration-300 focus:ring-indigo-500 focus:ring-[1px] focus:outline-none"
            placeholder="note..."
            id={`${id}-textarea`}
            value={data}
            onChange={handleChange}
            onBlur={handleBlur}
            spellCheck={false}
            onKeyDown={handleKeyDown}
            onWheel={stopPropagation}
            onScroll={stopPropagation}
            onFocus={handleFocus}
         />
      </div>
   );
};

const NoteCard = (props) => {
   const { data } = props;
   const { id, title } = data;

   return (
      <>
         <RND id={id}>
            <div className="w-full h-full select-none border-[1px] border-neutral-700/50 flex flex-col fade-in slide-in-from-top-5 duration-300  bg-slate-950  rounded-[6px]">
               <CardHeader
                  id={id}
                  title={title}
                  variant="noteAndCode"
                  size="noteAndCode"
               />
               <Body card={data} />
               <TopIcons id={id} />
               <BottomIcons id={id} />
            </div>
         </RND>
      </>
   );
};

export default NoteCard;