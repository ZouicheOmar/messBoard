/** @format */

export const DragIcon = ({ className }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="16"
         height="16"
         fill="currentColor"
         className={className}
         viewBox="0 0 16 16"
      >
         <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
      </svg>
   );
};

export const FocusIcon = ({ className }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24"
         viewBox="0 -960 960 960"
         width="24"
         className={className}
      >
         <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v320q0 33-23.5 56.5T800-80H480Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
   );
};

export const ResizeIcon = ({ className }) => {
   return (
      <svg
         height="18"
         viewBox="0 0 18 18"
         width="18"
         xmlns="http://www.w3.org/2000/svg"
         className={className}
      >
         <path
            d="m14.228 16.227a1 1 0 0 1 -.707-1.707l1-1a1 1 0 0 1 1.416 1.414l-1 1a1 1 0 0 1 -.707.293zm-5.638 0a1 1 0 0 1 -.707-1.707l6.638-6.638a1 1 0 0 1 1.416 1.414l-6.638 6.638a1 1 0 0 1 -.707.293zm-5.84 0a1 1 0 0 1 -.707-1.707l12.477-12.477a1 1 0 1 1 1.415 1.414l-12.478 12.477a1 1 0 0 1 -.707.293z"
            // fill="#494c4e"
         />
      </svg>
   );
};

export const ChevronIcon = ({ className }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="20"
         width="20"
         viewBox="0 -960 960 960"
         className={className + "scale-125"}
      >
         <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
      </svg>
   );
};

export const RightArrowIcon = ({ className }) => {
   return (
      <svg
         width="15"
         height="15"
         viewBox="0 0 15 15"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         className={`"h-5 w-5" ${className}`}
      >
         <path
            d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
         ></path>
      </svg>
   );
};

export const FitScreenIcon = ({ className }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      className={className}
   >
      <path d="M800-600v-120H680v-80h120q33 0 56.5 23.5T880-720v120h-80Zm-720 0v-120q0-33 23.5-56.5T160-800h120v80H160v120H80Zm600 440v-80h120v-120h80v120q0 33-23.5 56.5T800-160H680Zm-520 0q-33 0-56.5-23.5T80-240v-120h80v120h120v80H160Zm80-160v-320h480v320H240Zm80-80h320v-160H320v160Zm0 0v-160 160Z" />
   </svg>
);
