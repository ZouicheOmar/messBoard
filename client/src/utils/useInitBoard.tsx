/** @format */
import useCardStore from "@/context/CardStore";
import { useEffect } from "react";

export default function InitBoardEffect() {
   const getLastFile = useCardStore((state) => state.getLastFile);

   return useEffect(() => {
      getLastFile();
   }, []);
}
