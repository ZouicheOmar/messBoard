/** @format */
import { useState, useEffect } from "react";

import useCardsState from "@/context/CardStore";
import useUiStore from "@/context/UiStore";

import { closeDrawer } from "@/utils/f&p";

import { Button } from "@/components/ui/button";
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
   CheckCircledIcon,
   Cross2Icon,
   EyeOpenIcon,
   FileIcon,
   HomeIcon,
} from "@radix-ui/react-icons";

const FilesList = () => {
   const { getCards } = useCardsState();
   const { files_list, getFiles, selectModeOff } = useUiStore();

   useEffect(() => {
      getFiles();
   }, []);

   const handleSelectItem = (e, item) => {
      selectModeOff();
      getCards(item);

      closeDrawer();
   };

   const handlePointerDown = (e) => {
      e.target.dataset.active = e.target.dataset.active === "on" ? "off" : "on";
      console.log("toggle select mode");
   };

   return (
      <TabsContent value="files">
         <div className="flex flex-col gap-3 ">
            <div className="w-full  text-base items-center flex justify-end px-1">
               {/* <span>files</span> */}
               <CheckCircledIcon
                  data-active="off"
                  onPointerDown={handlePointerDown}
                  className="scale-110 data-[active=on]:text-indigo-500  transition-colors duration-300 cursor-pointer"
               />
            </div>
            <ul className="list-disc w-full list-inside ">
               {" "}
               {files_list ? (
                  files_list.map((item, index) => (
                     <li
                        className="hover:bg-neutral-800 rounded cursor-pointer transition-colors h-[1.5rem] px-2 flex justify-between items-center"
                        key={index}
                        onClick={(e) => handleSelectItem(e, item)}
                     >
                        {item}
                        <span>
                           <Cross2Icon className="h-full hover:bg-red-900 transition-colors rounded-sm hover:text-red-500 hover:cursor-pointer" />
                        </span>
                     </li>
                  ))
               ) : (
                  <span>No files, please create a file</span>
               )}
            </ul>
         </div>
      </TabsContent>
   );
};

const ImageList = () => {
   const { getImagesList, imagesList, cards } = useCardsState();

   useEffect(() => {
      getImagesList();
      console.log(
         `imageList : ${imagesList.length === 0}, typeof : ${typeof imagesList}`
      );
      console.log(imagesList);
   }, []);

   const handlePointerDown = (e) => {
      e.target.dataset.active = e.target.dataset.active === "on" ? "off" : "on";
      console.log("toggle select mode");
   };

   return (
      <TabsContent value="images" className=" flex flex-col gap-3 ">
         <div className="flex flex-col gap-3 ">
            <div className="w-full text-base items-center flex justify-end px-1">
               {/* <span>files</span> */}
               <CheckCircledIcon
                  data-active="off"
                  onPointerDown={handlePointerDown}
                  className="scale-110 data-[active=on]:text-indigo-500  transition-colors duration-300 cursor-pointer"
               />
            </div>

            <ul className="list-disc w-full list-inside ">
               {imagesList.map((item) => {
                  return (
                     <Dialog>
                        <li
                           key={item}
                           className="hover:bg-neutral-800 rounded cursor-pointer transition-colors h-[1.5rem] px-2 flex justify-between items-center"
                        >
                           <span className="w-[10rem]  text-nowrap overflow-hidden">
                              {/* {cards[item].title || "untitled image"} */}
                              {"untitled image"}
                           </span>
                           {/* <span>{cards[item].board}</span> */}
                           <span>boardName</span>
                           <DialogTrigger asChild>
                              <EyeOpenIcon className="text-neutral-500 cursor-pointer hover:text-neutral-200 transition-colors duration-100" />
                           </DialogTrigger>
                        </li>
                        <DialogContent className="p-0 ">
                           <div className="p-1 rounded-[8px]   bg-neutral-300 transition-all duration-100">
                              <img
                                 id={`${item}-image`}
                                 src={`http://localhost:${
                                    import.meta.env.VITE_PORT
                                 }/${item}`}
                                 // alt={cards[item].title || "image card"}
                                 alt={"image card"}
                                 className=" object-scale-down rounded-[6px]"
                              />
                           </div>
                        </DialogContent>
                     </Dialog>
                  );
               })}
            </ul>
         </div>
      </TabsContent>
   );
};

const BodyFiles = () => {
   return (
      <Tabs
         defaultValue="files"
         className="relative grow w-full p-1 bg-neutral-900/50 ring-[1px] ring-neutral-700 rounded-[8px]"
      >
         <TabsList className="w-full bg-neutral-900">
            <TabsTrigger value="files" className="w-full">
               Files
            </TabsTrigger>
            <TabsTrigger value="images" className="w-full">
               Images
            </TabsTrigger>
         </TabsList>
         <FilesList />
         <ImageList />
      </Tabs>
   );
};

const BodyCreateNewFile = () => {
   const createNewFile = useCardsState((state) => state.createNewFile);
   const [value, setValue] = useState("");

   const handleCreateNewFile = async (e) => {
      e.preventDefault();
      createNewFile(value);
   };

   return (
      <div className="w-full p-3 gap-2 ring-[1px] bg-neutral-900/50 ring-neutral-700 rounded-[8px]">
         <span>Add a new board</span>
         <form
            className="w-full flex flex-col md:flex-row py-1 justify-start  gap-2 "
            onSubmit={handleCreateNewFile}
         >
            <input
               type="text"
               placeholder="name"
               value={value}
               className="bg-neutral-950 grow px-2 py-1 ring-neutral-800 ring-[1px] rounded-[6px]"
               onChange={(e) => setValue(e.target.value)}
            />
            <Button
               className="w-full md:w-1/3 ring-[1px] outline-none bg-neutral-950 ring-neutral-800"
               type="submit"
            >
               add
            </Button>
         </form>
      </div>
   );
};

const BodyLeft = () => {
   return (
      <div className="flex flex-col gap-3 w-full md:w-2/5">
         <BodyFiles />
         <BodyCreateNewFile />
      </div>
   );
};

const BodyRight = () => {
   return (
      <div className="w-full md:w-3/5 md:h-full ">
         <div className="w-full h-full flex flex-col gap-6 bg-neutral-900/50 ring-[1px] rounded-[8px] p-3 ring-neutral-700">
            <p>
               This is mess board, add basic text cards, markdown cards, some
               code snippets and images.
               <br />
            </p>
            <div>
               <p>Controls </p>
               <ul className="pl-2">
                  <li> ctrl + Q or W or E : focus on card with a shortcut</li>
                  <li> ctrl + J : focus on card up</li>
                  <li> ctrl + K : focus on card down</li>
                  <li> ctrl + S : Save</li>
                  <li> ctrl + G : toggle drawer</li>
                  <li> ctrl + O : go to board's top-left corner</li>
               </ul>
            </div>
         </div>
      </div>
   );
};

const Trigger = () => {
   return (
      <DrawerTrigger asChild>
         <Button
            id="drawerMenu"
            className="animate-in fade-in slide-in-from-left-5 duration-100 outline-none"
         >
            Mess Board
         </Button>
      </DrawerTrigger>
   );
};

const BodyHeader = () => {
   const { file_name } = useCardsState();
   return (
      <DrawerHeader className="">
         <DrawerTitle className="inline-flex items-center justify-start gap-1 content-center">
            <FileIcon />
            <span className="">{file_name}</span>
         </DrawerTitle>
      </DrawerHeader>
   );
};

const BodyFooter = () => {
   return (
      <DrawerFooter className="flex-none h-fit mb-0">
         <p className="w-full text-sm text-center text-neutral-700">
            Built by @Razal, free of license, ozdocs.com
         </p>
      </DrawerFooter>
   );
};

const Body = () => {
   return (
      <>
         <DrawerContent className="text-sm border-none ring-none outline-none h-3/4 min-h-1/2">
            <BodyHeader />
            <div className="flex flex-col md:flex-row flex-grow min-w-full h-full gap-3 px-4 py-0  ">
               <BodyLeft />
               <BodyRight />
            </div>
            <BodyFooter />
            <CloseButton />
         </DrawerContent>
      </>
   );
};

const CloseButton = () => {
   return (
      <DrawerClose asChild>
         <Button
            className="absolute top-1 right-1 bg-none border-none"
            id="drawer_close_button"
         >
            <Cross2Icon />
         </Button>
      </DrawerClose>
   );
};

export function DrawerMenu() {
   return (
      <Drawer>
         <Trigger />
         <Body />
      </Drawer>
   );
}

export default DrawerMenu;
