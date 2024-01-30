/** @format */
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import useCardStore from "@/context/CardStore";

export default function BoardMessage() {
   const { cards, message, setMessage, file_name } = useCardStore();

   useEffect(() => {
      if (file_name === "") {
         setMessage("");
      } else {
         if (Object.entries(cards).length === 0) {
            setMessage("no cards");
         } else {
            setMessage("");
         }
      }
   });

   return (
      <AnimatePresence>
         {message !== "" && (
            <motion.div
               className="absolute flex flex-col justify-start w-[20rem]"
               initial={{ x: -10, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: -10, opacity: 0 }}
               transition={{ duration: 0.3 }}
            >
               <p className="text-sm text-start w-fit">
                  {`Current board : ${file_name === "" ? "none" : file_name}`}
                  <br />
                  {message}
               </p>
               {file_name === "" && (
                  <p className="mt-10 brightness-[0.25] cousine-font text-sm text-start w-fit">
                     {" "}
                     press ctrl + G
                  </p>
               )}
            </motion.div>
         )}
      </AnimatePresence>
   );
}
