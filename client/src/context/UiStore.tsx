/** @format */

import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import useCardStore from "./CardStore";
import { animate } from "framer-motion";

import { ROUTES, AXIOS_FORMDATA_CONFIG } from "@/utils/constants";

const useUiStore = create(
   immer((set, get) => ({
      files_list: "",
      file_name: "",

      mx: 0,
      my: 0,

      insertImageX: 0,
      insertImageY: 0,

      uiCards: {},
      anySelected: 0,
      select: false,
      selectedFile: "",

      translateX: 0,
      translateY: 0,

      insertImageDialogOpen: false,

      zoom: 1,

      fitScreen: false,

      setTX: (value, element) => {
         // const board = document.getElementById("board");
         set((state) => {
            state.translateX = value;
            animate(
               element,
               {
                  x: state.translateX,
               },
               {
                  // ease: "linear",
                  stiffness: 1000,
                  damping: 0,
               }
            );
            return;
         });
      },
      setTY: (value, element) => {
         // const board = document.getElementById("board");
         set((state) => {
            state.translateY = value;
            animate(
               element,
               {
                  y: state.translateY,
               },
               {
                  // ease: "linear",
                  stiffness: 1000,
                  damping: 0,
               }
            );
            return;
         });
      },
      zoomIn: () => {
         set((state) => {
            if (state.zoom <= 1.7) {
               state.zoom += 0.1;
               state.fitScreen = false;
               return;
            } else {
               return;
            }
         });
      },
      zoomOut: () => {
         set((state) => {
            if (state.zoom >= 0.4) {
               state.zoom -= 0.1;
               state.fitScreen = false;
               return;
            } else {
               return;
            }
         });
      },
      zoomReset: () => set(() => ({ zoom: 1 })),

      setMx: (value) => set(() => ({ mx: value })),
      setMy: (value) => set(() => ({ my: value })),
      setInsertImageX: (value) => set(() => ({ insertImageX: value })),
      setInsertImageY: (value) => set(() => ({ insertImageY: value })),

      center: () => {
         const board = document.getElementById("board");

         animate(
            board,
            {
               x: 0,
               y: 0,
            },
            { duration: 0.3 }
         );

         setTimeout(() => {
            set((state) => {
               state.translateX = 0;
               state.translateY = 0;
               // state.zoom = 1;
            });
         }, 310);
      },

      fitCanva: (widthRatio) => {
         set((state) => {
            state.fitScreen = true;
            if (widthRatio <= 0.4) {
               state.zoom = 0.4;
               return;
            }
            state.zoom = widthRatio;
            return;
         });
      },

      topLeft: () => {
         const board = document.getElementById("board");
         animate(
            board,
            {
               // x: `-${width / 4}px`,
               // y: "50%",
               x: 0,
               y: 0,
               origin: "50%",
            },
            { duration: 0.3 }
         );
         set((state) => {
            state.translateX = 0;
            state.translateY = 0;
            state.zoom = 1;
            state.fitScreen = false;
         });
      },

      getFiles: async () => {
         axios
            .get(ROUTES.FILES_LIST, AXIOS_FORMDATA_CONFIG)
            .then((res) => {
               set((state) => {
                  state.files_list = res.data;
               });
            })
            .catch((err) => {
               console.log("problem while trying to get files", err);
            });
      },

      logState: () => {
         const state = get().uiCards;
         console.log("files_list", state);
      },

      addUiCard: (card) => {
         set((state) => {
            state.uiCards = { ...state.uiCards, ...card };
            return;
         });
      },

      deleteUiCard: (id) => {
         console.log("uiCards before delete", get().uiCards);
         set((state) => {
            delete state.uiCards[id];
            return;
         });
         console.log("uiCards after delete", get().uiCards);
      },

      initCards: () => {
         const cards = useCardStore.getState().cards;
         const cards_array = Object.entries(cards);

         let emptyList = {};

         for (let i = 0; i < cards_array.length; i++) {
            const id = cards_array[i][0];
            const { top, left } = cards_array[i][1].position;
            const { width, height } = cards_array[i][1].size;
            const obj = {
               [id]: {
                  selected: false,
                  top: top,
                  left: left,
                  width: width,
                  height: height,
               },
            };

            emptyList = { ...emptyList, ...obj };
         }

         set((state) => {
            state.uiCards = { ...emptyList };
         });
      },

      toggleSelectCard: (id, value) => {
         const cards = get().uiCards;
         let n = 0;

         set((state) => {
            state.uiCards[id].selected = !state.uiCards[id].selected || value;
            return;
         });

         for (const id in cards) {
            if (cards[id].selected) {
               n += 1;
            } else {
               n -= 1;
            }
         }

         set((state) => {
            state.anySelected = n;
            return;
         });
      },

      selectAll: () => {
         for (const id in get().uiCards) {
            set((state) => {
               state.uiCards[id].selected = true;
               return;
            });
         }

         set((state) => {
            state.anySelected = get().uiCards.length;
            return;
         });
      },

      deselectAll: () => {
         for (const id in get().uiCards) {
            set((state) => {
               state.uiCards[id].selected = false;
               return;
            });
         }

         set((state) => {
            state.anySelected = 0;
            return;
         });
      },

      toggleSelect: () => {
         const select = get().select;
         if (select) {
            get().deselectAll();
            set((state) => {
               state.select = false;
               return;
            });
         } else {
            return set((state) => {
               state.select = true;
            });
         }
      },

      selectModeOff: () => {
         get().deselectAll();
         set((state) => {
            state.select = false;
            return;
         });
         return;
      },

      toggleInsertImageDialogOpen: (value) => {
         set((state) => {
            state.insertImageDialogOpen = value;
            return;
         });
      },
   }))
);

export default useUiStore;
