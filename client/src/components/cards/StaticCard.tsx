/** @format */

import useCardStore from "@/stores/CardStore";

const StaticCardHeader = (props) => {
   const { title } = props;

   return (
      <div className="w-full h-7 flex-none">
         <p
            className={`text-sm text-start min-w-full bg-inherit ${
               !title && "text-neutral-500"
            }`}
         >
            {title ? title : "Untitled card"}
         </p>
      </div>
   );
};

const StaticCardBody = (props) => {
   const { data, type } = props;

   return (
      <div className="grow overflow-scroll pt-1 text-sm">
         {type === "code" && (
            <pre>
               <code>{data.code}</code>
            </pre>
         )}
         {type === "note" && <p className="">{data}</p>}
      </div>
   );
};

const StaticCard = (props) => {
   const { id } = props;
   const { cards } = useCardStore();
   const card = cards[id];
   const { data, type } = card;

   return (
      <div className="w-3/5 min-h-[300px] max-h-1/2 grow overflow-scroll bg-slate-950 ring-[1px] ring-neutral-900 rounded-sm p-2">
         <StaticCardHeader title={card.title} />
         <StaticCardBody data={data} type={type} />
      </div>
   );
};

export default StaticCard;
