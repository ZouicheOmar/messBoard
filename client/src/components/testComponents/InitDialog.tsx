/** @format */

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "../ui/button";

import useUiStore from "@/context/UiStore";
import { useEffect } from "react";
import useCardsState from "@/context/CardStore";

const Body = () => {
   const { listFiles, getFile, filesList } = useUiStore();
   const { getCards } = useCardsState();

   useEffect(() => {
      getFiles();
   }, []);

   const handleSelectFile = (e, file_name) => {
      e.stopPropagation();
      console.log(typeof file_name, file_name);
      // getCards(path)
   };

   return (
      <DialogContent className="min-h-1/3 max-h-full gap-0 text-sm text-neutral-300">
         <div className="w-full flex flex-col  gap-2 ">
            <p className="text-[1.1rem] leading-[1.1rem]">
               Welcome to you Green Board
            </p>
            <div className="flex flex-col flex-grow gap-2 justify-between">
               <div className="">
                  <p>choose a file</p>
                  <ul className="list-disc list-inside">
                     {filesList &&
                        filesList.map((item, index) => {
                           return (
                              <li
                                 key={index}
                                 onClickCapture={(e) =>
                                    handleSelectFile(e, item)
                                 }
                                 className="hover:bg-neutral-800 cursor-pointer pl-1"
                              >
                                 {item}
                              </li>
                           );
                        })}
                  </ul>
               </div>
               {/* <div className="flex justify-between">
                        <Button
                            onClickCapture={handleSend}
                            variant="outline"
                            className="w-fit text-sm py-0 px-1 h-fit"
                        >
                            send something
                        </Button>
                        <Button
                            onClickCapture={handleClick}
                            variant="outline"
                            className="w-fit text-sm py-0 px-1 h-fit"
                        >
                            show
                        </Button>
                    </div> */}
            </div>
         </div>
      </DialogContent>
   );
};

const InitDialog = () => {
   return (
      <Dialog defaultOpen>
         <DialogTrigger asChild>
            <Button variant="outline">MessBoard</Button>
         </DialogTrigger>
         <Body />
      </Dialog>
   );
};

export default InitDialog;
