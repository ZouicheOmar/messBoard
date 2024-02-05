/** @format */
import useUiStore from "@/stores/UiStore";
import useSubmitImage from "@/hooks/useSubmitImage";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";

const Body = () => {
   const { setFile, submit } = useSubmitImage();

   return (
      <DialogContent className="min-h-1/3 max-h-full bg-slate-900  ring-slate-800 ring-[1px] border-none rounded-sm text-sm flex flex-col gap-2 ">
         <span>Pick a picture</span>
         <form className=" flex w-full items-center gap-1 " onSubmit={submit}>
            <input
               id="picture"
               type="file"
               required
               className="p-1 outline-none ring-slate-800/75 ring-[1px] rounded-sm"
               onChange={(e) => setFile(e.target.files[0])}
            />
            <Button className="grow">Insert</Button>
         </form>
      </DialogContent>
   );
};

export default function InsertImageDialog() {
   const { insertImageDialogOpen, toggleInsertImageDialogOpen } = useUiStore();

   return (
      <Dialog
         open={insertImageDialogOpen}
         onOpenChange={toggleInsertImageDialogOpen}
      >
         <DialogTrigger asChild>
            <span className="justify-between px-2 py-1 rounded-none w-full text-sm hover:bg-neutral-800">
               insert image
            </span>
         </DialogTrigger>
         <Body />
      </Dialog>
   );
}
