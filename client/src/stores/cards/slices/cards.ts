/** @format */
import useUiStore from "@/stores/UiStore";
import axios from "axios";

import useUiStore from "@/stores/UiStore";

import { v4 as uuidv4 } from "uuid";
import { animate } from "framer-motion";

import { getRectById } from "@/utils/positions";
import { ROUTES, AXIOS_CONFIG } from "@/utils/constants";

export const cardsSlice = (set, get) => ({
   cards: {},
   idList: [],
   ids: [],

   async getCards(fileName) {
      axios
         .get(`${ROUTES.SELECT_FILE}${fileName}`)
         .then((res) => {
            const cards = res.data.cards;
            const ids = [];

            for (const id in cards) {
               ids.push(id);
            }

            set((state) => {
               state.cards = cards;
               state.idList = Object.keys(cards);
               state.ids = ids;
               state.fileName = fileName;
               return;
            });
         })
         .catch((err) => {
            get().setMessage("no selected file");

            if (!err.response) {
               console.log("Error : NETWORK ERROR");
            } else {
               console.log(err.response.data.message);
            }
         });
      return;
   },

   addCard(type: string | null) {
      console.log(`from add card type : ${type}`);
      const { mx, my, addUiCard } = useUiStore.getState();
      const { top, left } = getRectById("board");
      const id = uuidv4().toString();

      console.log(`from addcard : ${left} ${top}`);
      console.log(`from addcard : ${mx}`);
      console.log(`from addcard : ${my}`);

      let size = { width: 300, height: 200 };
      let data = "";

      if (type === "url") {
         console.log("none");
      }
      if (type === "code") {
         data = {
            lang: "javascript",
            code: "function add(a, b) {\n  return a + b;\n}",
         };
      }
      if (type === "markdown") {
         size = { width: 250, height: 350 };
         data = "### Hi ! Double tap to edit";
      }

      const baseCard = {
         [id]: {
            id: id,
            type: type,
            position: { left: mx - left, top: my - top },
            size: size,
            shortcut: "",
            title: "",
            data: data,
            folded: false,
            tags: [],
         },
      };

      const uicard = {
         [id]: {
            selected: false,
            top: top,
            left: left,
            width: size.width,
            height: size.height,
         },
      };

      addUiCard(uicard);
      set((state) => {
         state.ids = [...state.ids, id];
         state.cards = { ...state.cards, ...baseCard };
         return;
      });
   },

   addImageCard: (id, dimension) => {
      useUiStore.getState().selectModeOff();

      const fileName = get().fileName;
      const addUiCard = useUiStore.getState().addUiCard;

      const { top, left } = getRectById("board");
      const mx = useUiStore.getState().insertImageX;
      const my = useUiStore.getState().insertImageY;

      const { width, height } = dimension;

      let size;
      if (width <= 700 || height <= 700) {
         size = {
            width: width / 2,
            height: height / 2,
         };
      } else if (width <= 1300 || height <= 1300) {
         size = {
            width: width / 3,
            height: height / 3,
         };
      } else if (width <= 1600 || height <= 1600) {
         size = {
            width: width / 4,
            height: height / 4,
         };
      } else if (width <= 2000 || height <= 2000) {
         size = {
            width: width / 6,
            height: height / 6,
         };
      } else {
         size = {
            width: width / 9,
            height: height / 9,
         };
      }

      const aspect = width / height;

      const newCard = {
         [id]: {
            id: id,
            type: "image",
            board: fileName,
            position: { left: mx + left, top: my + top },
            size: size,
            aspect: aspect,
            title: "",
            folded: false,
            tags: [],
         },
      };

      const uicard = {
         [id]: {
            selected: false,
            top: top,
            left: left,
            width: size.width,
            height: size.height,
         },
      };

      addUiCard(uicard);

      set((state) => {
         state.ids = [...state.ids, id];
         state.cards = { ...state.cards, ...newCard };
         return;
      });

      get().writeThisFile(false);
   },

   deleteCard: (id) => {
      const { type } = get().cards[id];
      set((s) => {
         delete s.cards[id];
      });
      useUiStore.getState().deleteUiCard(id);
      if (type === "image") {
         axios
            .post(
               `${ROUTES.DELETE_IMAGE}${id}`,
               {
                  action: "deleting file",
               },
               AXIOS_CONFIG
            )
            .then((res) => {
               console.log(res);
               return;
            })
            .catch((err) => {
               console.log(err);
               console.log("problem deleting image");
            });
      }
      // get().writeThisFile(false);
   },
});
