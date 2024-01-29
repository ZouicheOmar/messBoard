/** @format */
import { useState } from "react";

export default function TestRect() {
   const [data, setData] = useState(false);
   return (
      <div
         className="absolute top-10 left-10 w-[400px] h-[150px] bg-slate-700/40"
         onPointerDown={function (e) {
            console.log(e.target.dataset);
            setData(!data);
         }}
         data-size="medium"
      >
         <div
            className={`absolute top-2 left-2 w-2 h-2 transition-all duration-300 bg-indigo-500 data-[state=true]:h-10 data-[size=large]:w-10 data-[state=true]:bg-red-500`}
            data-state={data}
            data-index="1"
            data-size="large"
            onPointerDown={function (e) {
               console.log(e.target.dataset);
            }}
         ></div>
      </div>
   );
}
