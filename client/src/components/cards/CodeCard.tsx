/** @format */
import Editor from "react-simple-code-editor";

import { highlight, languages } from "prismjs";

import useCardStore from "@/stores/CardStore";

import RND from "./components/RND";
import CardHeader from "./components/Header";
import TopIcons from "./components/TopIcons";
import BottomIcons from "./components/BottomIcons";

import "../../../node_modules/prismjs/components/prism-clike";
import "../../../node_modules/prismjs/components/prism-javascript";
import "../../../node_modules/prismjs/components/prism-python";
import "../../../node_modules/prismjs/themes/prism.css";

const Body = (props) => {
   const { card } = props;
   const { id, data } = card;
   const { code } = data;
   const updateData = useCardStore((state) => state.updateData);

   return (
      <Editor
         textareaId={`${id}-textarea`}
         value={code}
         onValueChange={() => updateData(id, code)}
         highlight={(code) => highlight(code, languages.js)}
         padding={8}
         style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 13,
         }}
         onBlur={() => updateData(id, code)}
         className="grow nondrag h-full active:ring-indigo-500 focus:ring-bg-500/15  active:ring-[1px] transition-all"
         textareaClassName="transition-colors  duration-300 active:bg-indigo-500/15   "
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
