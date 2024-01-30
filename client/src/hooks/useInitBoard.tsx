/** @format */
import { useEffect } from "react";
import useUiStore from "@/context/UiStore";
import useCardStore from "@/context/CardStore";

export default function useInitBoard() {
   const { file_name, writeThisFile } = useCardStore();
   const { initCards } = useUiStore();

   const handleBeforeUnload = () => {
      setTimeout(() => {
         writeThisFile(false);
         localStorage.setItem("last_file", file_name);
      }, 0);
   };

   useEffect(() => {
      initCards();
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
         window.removeEventListener("beforeunload", handleBeforeUnload);
      };
   }, [file_name]);
}