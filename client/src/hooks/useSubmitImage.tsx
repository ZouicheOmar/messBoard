/** @format */
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import useUiStore from "@/context/UiStore";
import useCardStore from "@/context/CardStore";

import { ROUTES, AXIOS_FORMDATA_CONFIG } from "@/constants";

export default function useSubmitImage() {
   const [file, setFile] = useState();
   const { addImageCard } = useCardStore();
   const { toggleInsertImageDialogOpen } = useUiStore();

   const submit = async (e) => {
      e.preventDefault();

      const fd = new FormData();
      const id = uuidv4().toString();

      fd.append("image", file);

      axios
         .post(`${ROUTES.SAVE_IMAGE}${id}`, fd, AXIOS_FORMDATA_CONFIG)
         .then((res) => {
            const { id, dimension } = res.data;
            //set card loading
            addImageCard(id, dimension);
            toggleInsertImageDialogOpen(false);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return { setFile, submit };
}
