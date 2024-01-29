/** @format */
import useCardStore from "@/context/CardStore";

import DrawerMenu from "./DrawerMenu";
import { Button } from "./ui/button";

import useUiStore from "@/context/UiStore";
import usePositions from "@/utils/updatePositions";

import { FitScreenIcon } from "./Icons";
import {
   CheckIcon,
   ChevronDownIcon,
   CornerTopLeftIcon,
   CrumpledPaperIcon,
   DotFilledIcon,
   ExitFullScreenIcon,
   LayersIcon,
} from "@radix-ui/react-icons";

const InFileButtons = () => {
   const {
      deleteSelected,
      writeThisFile,
      file_name,
      organize,
      focus,
      focused,
      focusPrevious,
      focusNext,
      foldSelected,
      toggleGroupMode,
      getCanvaSize,
   } = useCardStore();

   const {
      toggleSelect,
      select,
      selectAll,
      deselectAll,
      anySelected,
      center,
      fitScreen,
      topLeft,
   } = useUiStore();

   const updatePositions = usePositions();

   const handleSave = () => {
      updatePositions();
      writeThisFile(file_name);
   };

   const focusOff = () => {
      console.log("focused", focused);
      const id = focused;
      const rndId = focused + "-rnd";
      focus(id, rndId);
   };

   const handleCenter = (e) => {
      if (!fitScreen) {
         getCanvaSize();
      }
      setTimeout(() => center(), 500);
   };

   return (
      file_name && (
         <>
            <Button onPointerDown={organize} id="organize_button">
               organize
               <LayersIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button
               id="originButton"
               onPointerDown={topLeft}
               className="animate-in fade-in slide-in-from-left-5 duration-100"
            >
               origin
               <CornerTopLeftIcon className="fill-white duration-300 ml-2  h-4 w-4" />
            </Button>
            <Button
               id="FitButton"
               onPointerDown={handleCenter}
               className="animate-in fade-in slide-in-from-left-5 duration-100"
            >
               fit
               <FitScreenIcon className="fill-white duration-300 ml-2  h-4 w-4" />
            </Button>
            <Button
               onPointerDown={handleSave}
               id="saveButton"
               className="group animate-in fade-in slide-in-from-left-5 duration-100 "
            >
               save
               <DotFilledIcon className="group-hover:animate-wiggle ml-2 mt-[2px] h-4 w-4" />
            </Button>
            <Button
               onPointerDown={toggleSelect}
               className={` animate-in fade-in slide-in-from-left-5 duration-300 overflow-hidden `}
            >
               select
               <CheckIcon
                  className={`${
                     select && "stroke-indigo-500"
                  } transition-colors duration-300 ml-2  h-4 w-4`}
               />
            </Button>
            {select && (
               <>
                  <Button
                     onPointerDown={selectAll}
                     className="animate-in fade-in slide-in-from-left-5 duration-300  "
                  >
                     all
                  </Button>
                  <Button
                     onPointerDown={deselectAll}
                     className="animate-in fade-in slide-in-from-left-5 duration-300 "
                     disabled={anySelected !== 0 ? false : true}
                  >
                     deselect
                  </Button>
                  <Button
                     onPointerDown={() => toggleGroupMode(true)}
                     className="animate-in fade-in slide-in-from-left-5 h-9 duration-300 "
                     disabled={anySelected !== 0 ? false : true}
                  >
                     group
                  </Button>

                  <Button
                     onPointerDown={deleteSelected}
                     className="group animate-in hover:text-red-500 fade-in slide-in-from-left-5 transition-all duration-300  "
                     disabled={anySelected !== 0 ? false : true}
                  >
                     delete
                     <CrumpledPaperIcon className=" ml-2 mt-[2px] h-4 w-4 transition-all duration-0 " />
                  </Button>
                  <Button
                     onPointerDown={foldSelected}
                     className="animate-in fade-in slide-in-from-left-5 transition-all duration-300  "
                     disabled={anySelected !== 0 ? false : true}
                  >
                     fold / unfold
                  </Button>
               </>
            )}
            {focused && (
               <span className="w-full flex justify-around">
                  <Button variant="outline" size="icon" onClick={focusPrevious}>
                     <ChevronDownIcon className="rotate-90" />
                  </Button>
                  <Button
                     variant="outline"
                     size="icon"
                     onPointerDown={focusOff}
                  >
                     <ExitFullScreenIcon />
                  </Button>
                  <Button variant="outline" size="icon" onClick={focusNext}>
                     <ChevronDownIcon className="-rotate-90" />
                  </Button>
               </span>
            )}
         </>
      )
   );
};

const LeftPanel = () => {
   return (
      <div
         className="fixed top-0 left-0 w-[9rem] px-[8px] text-sm h-full z-20 py-2"
         onPointerDown={(e) => e.stopPropagation()}
      >
         <div className="w-full h-fit  p-0 bg-neutral-900/70 flex flex-col gap-2 py-[4px] px-[4px] rounded">
            <DrawerMenu />
            <InFileButtons />
            {/* <CardsLogButton />
            <LogButton /> */}
            {/* <ClearConsoleButton />
            <ResetButton /> */}
         </div>
      </div>
   );
};

export default LeftPanel;

{
   /**
const LogButton = () => {
   const logState = useUiStore((state) => state.logState);

   return (
      <Button
         variant="outline"
         onClick={logState}
         className="animate-in fade-in  slide-in-from-top-5 rounded-3xl duration-200   bg-[#ff4d06] text-neutral-900 focus:outline-none"
      >
         ui state
      </Button>
   );
};

const CardsLogButton = () => {
   const logState = useCardsState((state) => state.logState);

   return (
      <Button
         variant="outline"
         onClick={logState}
         className="animate-in fade-in  slide-in-from-top-5 rounded-3xl duration-200   bg-[#ff4d06] text-neutral-900 focus:outline-none"
      >
         cards state
      </Button>
   );
};

const ClearConsoleButton = () => {
   return (
      <Button
         variant="outline"
         id="clear_button"
         onClick={console.clear}
         className="animate-in fade-in slide-in-from-top-5 duration-200 rounded-3xl text-indigo-100 bg-indigo-900 focus:outline-none"
      >
         clear
      </Button>
   );
};

const ResetButton = () => {
   const handleClick = () => {
      console.log(
         "https://github.com/pmndrs/zustand/blob/main/docs/guides/how-to-reset-state.md"
      );
   };

   return (
      <Button
         variant="outline"
         onClick={handleClick}
         className="animate-in fade-in slide-in-from-top-5 duration-200 rounded-3xl bg-[#ff4d06] text-indigo-500 focus:outline-none"
      >
         reset
      </Button>
   );
};

 */
}
