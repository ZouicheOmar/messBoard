/** @format */

import DrawerMenu from "../contextMenus/DrawerMenu";
import { InFileButtons } from "./InFileButtons";

const LeftPanel = () => {
   return (
      <div
         className="fixed top-0 left-0 w-[9rem] px-[8px] text-sm h-full z-20 py-2"
         onPointerDown={(e) => e.stopPropagation()}
      >
         <div className="w-full h-fit  p-0 bg-neutral-900/70 flex flex-col gap-2 py-[4px] px-[4px] rounded">
            <DrawerMenu />
            <InFileButtons />
         </div>
      </div>
   );
};

export default LeftPanel;
