/** @format */

import { motion, DragControls } from "framer-motion";
import { useEffect, useState } from "react";

const makeString = (value, orientation) => {
   const direction = orientation === "top" ? "translate-y-[" : "translate-x-[";
   // const direction = orientation === 'top' ? 'top-[' : 'left-['
   const numToString = value.toString();
   const closingString = "px]";
   const result = direction + numToString + closingString;
   return result;
};

const Carre = ({ coordinates }) => {
   const { top, left } = coordinates;

   return (
      <motion.div
         drag
         style={{
            position: "absolute",
            top: `${top}px`,
            left: `${left}px`,
            // left: left,
            // transform: `translate(${left}px, ${top}px)`,
         }}
         className={`  bg-pink-700/65 w-[8rem] h-[4rem] ring-[1px] rounded-sm ring-white`}
      ></motion.div>
   );
};

const Tableau = () => {
   return (
      <motion.div className="relative w-full h-[91vh] bg-indigo-900/75 rounded-sm">
         <Carre coordinates={{ top: "50", left: "50" }} />
         <Carre coordinates={{ top: "100", left: "100" }} />
         <Carre coordinates={{ top: "150", left: "150" }} />
      </motion.div>
   );
};

export default Tableau;
