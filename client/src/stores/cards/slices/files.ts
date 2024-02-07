/** @format */

import axios from "axios";
import { openDrawer, closeDrawer } from "@/utils/positions";

import { AXIOS_CONFIG, ROUTES } from "@/utils/constants";

import { toast } from "sonner";

export const filesSlice = (set, get) => ({
   //    file_name: "",
   fileName: "",

   getLastFile() {
      const cb = () => {
         const lastFile = localStorage.getItem("last_file");
         if (lastFile !== "") {
            get().getCards(lastFile);
         } else {
            openDrawer();
            set((state) => {
               state.message =
                  "no files selected, please create or pick a file";
            });
         }
      };

      setTimeout(cb, 500);
   },

   async writeThisFile(showToast = true) {
      const { cards, getCards, fileName } = get();

      if (fileName === "") {
         toast.error("Can't save, not in a board", {});
         return;
      }

      const data = {
         cards: cards,
      };

      axios
         .post(`${ROUTES.SAVE_FILE}${fileName}`, data, AXIOS_CONFIG)
         .then(() => {
            showToast && toast.success("saved", {});
            //why do i call get cards in here ?
            getCards(fileName);
         })
         .catch((err) => {
            showToast && toast.error("problem saving file", {});
            console.log(err);
         });
   },

   async createFile(fileName: string) {
      const getCards = get().getCards;
      console.log(`from store in createFile : ${fileName}`);
      const data = {
         fileName: fileName,
      };

      await axios
         .post(ROUTES.CREATE_FILE, data, AXIOS_CONFIG)
         .then((res) => {
            console.log(`file supposedly created : ${res.data}`);
            getCards(fileName);
            closeDrawer();
         })
         .catch((err) => {
            console.log(err);
         });
   },
});
