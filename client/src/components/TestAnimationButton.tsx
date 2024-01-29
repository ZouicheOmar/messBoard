/** @format */
import { cn } from "@/utils";
import { cva } from "class-variance-authority";

const className =
   "group relative inline-flex items-center justify-center overflow-hidden rounded-[4px] transition-all duration-75  active:translate-y-[2px] active:shadow-none";

const buttonVariants = cva(className, {
   variants: {
      variant: {
         default: "bg-slate-900 [box-shadow:0px_2px_0px_#334155] ",
         second: "bg-red-500 text-neutral-800",
         danger:
            "bg-red-500 [box-shadow:0px_2px_0px_#991b1b] text-neutral-950 ",
         third: "",
         happy: "bg-yellow-500 [box-shadow:0px_2px_0px_#a16207] text-neutral-950 ",
      },
      size: {
         default: "h px-2 py-1",
         sm: "h-8 rounded-md px-3 text-xs",
         icon: "h-9 w-9",
      },
   },
   defaultVariants: {
      variant: "default",
      size: "default",
   },
});

const TestAnimationButton = ({ className, variant, size, ...props }) => {
   return (
      <button
         className={cn(buttonVariants({ variant, size, className }))}
         {...props}
      />
   );
};

export default TestAnimationButton;

const CSSBUTTON = () => {
   return (
      <a
         href="#_"
         className="relative inline-flex items-center justify-center py-1 overflow-hidden text-white rounded-md shadow-2xl group"
      >
         <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
         <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
         <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
         <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
         <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
         <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
         <span className="relative">oragnize</span>
      </a>
   );
};
