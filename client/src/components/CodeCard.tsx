/** @format */
import { useCallback } from "react";
import Editor from "react-simple-code-editor";

import { highlight, languages } from "prismjs";

import useCardStore from "@/context/CardStore";

import RND from "./RND";
import CardHeader from "./CardHeader";
import TopIcons from "./CardTopIcons";
import BottomIcons from "./CardBottomIcons";

import "../../node_modules/prismjs/components/prism-clike";
import "../../node_modules/prismjs/components/prism-javascript";
import "../../node_modules/prismjs/components/prism-python";
import "../../node_modules/prismjs/themes/prism.css";

const Body = (props) => {
   const { card } = props;
   const { id, data } = card;
   const { code } = data;
   const updateData = useCardStore((state) => state.updateData);

   const handleBlur = useCallback(() => {
      updateData(id, code);
   });

   const handleChange = useCallback((code) => {
      updateData(id, code);
   });

   return (
      <Editor
         value={code}
         onValueChange={handleChange}
         highlight={(code) => highlight(code, languages.js)}
         padding={8}
         style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 13,
         }}
         onBlur={handleBlur}
         className="grow nondrag h-full active:ring-indigo-500 active:ring-[1px] transition-all"
         textareaClassName="outline-none "
      />
   );
};

const CodeCard = (props) => {
   const { data } = props;
   const { id, title } = data;

   return (
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
   );
};

export default CodeCard;
