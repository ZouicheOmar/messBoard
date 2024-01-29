/** @format */

import { Tags } from "./Tags";
import useCardsState from "@/context/CardStore";

import { ChevronIcon, ResizeIcon } from "./Icons";

export default function BottomIcons(props) {
   const { id } = props;
   const { cards, toggleFoldCard } = useCardsState();

   const { folded, tags } = cards[id];

   return (
      <div className="flex-none w-full flex grow-0  justify-between items-end bg-none rounded-b h-6">
         <button
            id={`${id}-foldButton`}
            className={`max-h-fit max-w-fit flex-none  hover:cursor-pointer transition-transform duration-100
                 ${folded ? "rotate-180" : "rotate-0"}
                 `}
            onClick={() => toggleFoldCard(id)}
         >
            <ChevronIcon className="fill-neutral-500 hover:fill-neutral-400 " />{" "}
         </button>
         <Tags tags={tags} />

         <ResizeIcon className="scale-75 flex-none fill-neutral-600" />
      </div>
   );
}
