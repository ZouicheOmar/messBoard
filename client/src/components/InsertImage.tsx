/** @format */
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useCardStore from "@/context/CardStore";
import useUiStore from "@/context/UiStore";

import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import { Button } from "./ui/button";

const Body = (props) => {
   const [file, setFile] = useState();
   const { dialogState } = props;
   const { setOpen } = dialogState;

   const { addImageCard } = useCardStore();
   const { setContextMenuOpen } = useUiStore();

   const handleSubmit = async (e) => {
      e.preventDefault();

      console.log("width ?", file);

      const fd = new FormData();
      const id = uuidv4().toString();
      const URL = `http://localhost:${
         import.meta.env.VITE_PORT
      }/saveImage/${id}`;

      fd.append("image", file);

      const config = {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      };

      axios
         .post(URL, fd, config)
         .then((res) => {
            console.log(res.data);
            const { id, dimension } = res.data;
            //set card loading
            addImageCard(id, dimension);
            setOpen(false);
            setContextMenuOpen(false);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <DialogContent className="min-h-1/3 max-h-full bg-slate-900  ring-slate-800 ring-[1px] border-none rounded-sm text-sm flex flex-col gap-2 ">
         <span>Pick a picture</span>
         <form
            className=" flex w-full items-center gap-1 "
            onSubmit={handleSubmit}
         >
            <input
               id="picture"
               type="file"
               className="p-1 outline-none ring-slate-800/75 ring-[1px] rounded-sm"
               onChange={(e) => setFile(e.target.files[0])}
            />
            <Button className="grow">Insert</Button>
         </form>
      </DialogContent>
   );
};

export default function InsertImageDialog() {
   const [open, setOpen] = useState(false);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <span className="justify-between px-2 py-1 rounded-none w-full text-sm hover:bg-neutral-800">
               insert image
            </span>
         </DialogTrigger>
         <Body dialogState={{ open, setOpen }} />
      </Dialog>
   );
}
