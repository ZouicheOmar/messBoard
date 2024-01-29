/** @format */
import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";
import { animate } from "framer-motion";

import { toast } from "sonner";

import useUiStore from "./UiStore";

import {
   getRectById,
   moduleCarre,
   makeGrid,
   getCurrentCardsPositions,
   closeDrawer,
   openDrawer,
   activateTextAreaById,
} from "@/utils/f&p";

const PORT = import.meta.env.VITE_PORT;
export const save_file_url = `http://localhost:${PORT}/save_file/`;
export const createFile_url = `http://localhost:${PORT}/createNewFile/`;
export const select_file_url = `http://localhost:${PORT}/select_file/`;
const imagesDirUrl = `http://localhost:${PORT}/imagesList/`;

const configjson = {
   headers: {
      "Content-Type": "application/json",
   },
};

const useCardStore = create(
   immer((set, get) => ({
      cards: {},
      idList: [],
      arranged: [],
      ids: [],
      arrangedNotesAndCodes: [],

      groupMode: false,
      groupPoint: 0,
      focused: false,
      activated: false,

      file_name: "",
      imagesList: [],

      message: "",

      setMessage: (value) => {
         set((state) => {
            state.message = value;
            return;
         });
      },

      logState: () => {
         const cards = get().cards;
         console.log("activated", cards);
      },

      getLastFile: () => {
         const loadingPreviousFile = () => {
            const lastFile = localStorage.getItem("last_file");
            if (lastFile !== "") {
               const getCards = get().getCards;
               getCards(lastFile);
            } else {
               openDrawer();
               set((state) => {
                  state.message =
                     "no files selected, please create or pick a file";
               });
            }
         };

         setTimeout(loadingPreviousFile, 500);
      },

      getImagesList: async () => {
         axios
            .get(imagesDirUrl, configjson)
            .then((res) => {
               set((state) => {
                  state.imagesList = res.data;
                  return;
               });
            })
            .catch((err) => {
               console.log(err);
            });
      },

      setActive: (id) => set(() => ({ activated: id })),

      active: (id, rndId) => {
         get().getArrangedNotesAndCodes();
         const card = document.getElementById(id);
         const card_rnd = document.getElementById(rndId);

         const activated = get().activated;
         const putOnTop = get().putOnTop;

         if (activated) {
            set((state) => {
               state.activated = false;
               return;
            });
         } else {
            putOnTop(id);
            set((state) => {
               state.activated = id;
               return;
            });
         }
      },

      activePrevious: () => {
         get().getArrangedNotesAndCodes();
         const cards = get().arrangedNotesAndCodes;

         const activated = get().activated;
         const putOnTop = get().putOnTop;

         let actualCardId;

         if (activated) {
            for (let i = 0; i < cards.length; i++) {
               const { id } = cards[i];
               console.log(id);
               if (id === activated) {
                  console.log("we got an activated card");
                  const previousIndex = i === 0 ? cards.length - 1 : i - 1;
                  console.log(`previous index ${previousIndex}`);
                  const nextId = cards[previousIndex].id;
                  activateTextAreaById(nextId);
                  actualCardId = nextId;
               }
            }
         } else {
            const { id } = cards[0];
            activateTextAreaById(id);
            putOnTop(id);
            actualCardId = id;
            console.log("in non active");
         }
         putOnTop(actualCardId);
         return;
      },

      activeNext: () => {
         get().getArrangedNotesAndCodes();
         const cards = get().arrangedNotesAndCodes;

         const activated = get().activated;
         const putOnTop = get().putOnTop;

         if (activated) {
            for (let i = 0; i < cards.length; i++) {
               const { id } = cards[i];
               console.log(id);
               if (id === activated) {
                  console.log("we got an activated card");
                  const previousIndex = i === cards.length - 1 ? 0 : i + 1;
                  console.log(`previous index ${previousIndex}`);
                  const nextId = cards[previousIndex].id;
                  activateTextAreaById(nextId);
                  putOnTop(nextId);
                  return;
               }
            }
         } else {
            const { id } = cards[0];
            activateTextAreaById(id);
            putOnTop(id);
         }
      },

      focus: (id, rndId) => {
         get().getArrangedCards();
         const wrapper_rect = getRectById("mainWrapper");

         const card = document.getElementById(id);
         const card_rnd = document.getElementById(rndId);

         const {
            size: cardSize,
            position: cardPosition,
            type: cardType,
            size,
         } = get().cards[id];

         const focused = get().focused;
         const putOnTop = get().putOnTop;

         const { width, height } = wrapper_rect;
         const focus_size = {
            width: 0.8 * width,
            height: 0.9 * height,
         };
         let imageFocusSize;
         const focus_position = {
            x: 0,
            y: 0,
         };

         if (focused) {
            animate(
               card,
               {
                  x: cardPosition.left,
                  y: cardPosition.top,
               },
               {
                  duration: 0.1,
                  delay: 0.2,
               }
            );

            animate(
               card_rnd,
               {
                  ...cardSize,
               },
               {
                  duration: 0.2,
               }
            );

            set((state) => {
               state.focused = false;
               return;
            });
         } else {
            putOnTop(id);
            useUiStore.getState().zoomReset();

            if (cardType === "image") {
               const focusImagePosition = {
                  x: "40%",
                  y: 0,
                  originX: "50%",
               };
               const { aspect } = get().cards[id];
               const { width: imw, height: imh } = size;
               if (width >= height) {
                  const ratio = width / imw;
                  console.log(`w > h and w = ${imw} and aspect : ${ratio}`);
                  imageFocusSize = {
                     width: imw * ratio * 0.5,
                     height: imh * ratio * 0.5,
                  };

                  animate(
                     card,
                     {
                        ...focusImagePosition,
                     },
                     {
                        duration: 0.1,
                     }
                  );

                  animate(
                     card_rnd,
                     {
                        ...imageFocusSize,
                     },
                     {
                        duration: 0.2,
                        delay: 0.1,
                     }
                  );
               } else {
                  console.log(
                     `h > w and h = ${imh} and aspect : ${height / imh}`
                  );
                  const ratio = height / imh;
                  console.log(`w > h and w = ${imw} and aspect : ${ratio}`);
                  imageFocusSize = {
                     width: imw * ratio * 0.5,
                     height: imh * ratio * 0.5,
                  };
                  animate(
                     card_rnd,
                     {
                        ...imageFocusSize,
                     },
                     {
                        duration: 0.2,
                        delay: 0.1,
                     }
                  );
                  animate(
                     card,
                     {
                        ...focusImagePosition,
                     },
                     {
                        duration: 0.1,
                     }
                  );
               }
            } else {
               animate(
                  card,
                  {
                     ...focus_position,
                  },
                  {
                     duration: 0.1,
                  }
               );
               animate(
                  card_rnd,
                  {
                     ...focus_size,
                  },
                  {
                     duration: 0.2,
                     delay: 0.1,
                  }
               );
            }

            set((state) => {
               state.focused = id;
               return;
            });
         }
      },

      focusPrevious: () => {
         const arranged = get().arranged;
         const ids = [];
         for (let i = 0; i < arranged.length; i++) {
            ids.push(arranged[i].id);
         }
         const focus = get().focus;
         const putOnTop = get().putOnTop;

         const focused_card = get().focused;
         const focused_card_rnd = focused_card + "-rnd";

         let index =
            ids.indexOf(focused_card) === 0
               ? ids.length
               : ids.indexOf(focused_card);

         const previous_card_id = ids[(index - 1) % ids.length];
         const previous_card_rnd = previous_card_id + "-rnd";

         focus(focused_card, focused_card_rnd);
         putOnTop(previous_card_id);
         focus(previous_card_id, previous_card_rnd);
      },

      focusNext: () => {
         const arranged = get().arranged;
         const ids = [];
         for (let i = 0; i < arranged.length; i++) {
            ids.push(arranged[i].id);
         }
         const focus = get().focus;
         const putOnTop = get().putOnTop;

         const focused_card = get().focused;
         const focused_card_rnd = focused_card + "-rnd";

         const index = ids.indexOf(focused_card);

         const next_card_id = ids[(index + 1) % ids.length];
         const next_card_rnd = next_card_id + "-rnd";

         focus(focused_card, focused_card_rnd);
         putOnTop(next_card_id);
         focus(next_card_id, next_card_rnd);
      },

      setFocused: (value) => {
         set((state) => {
            state.focused = value;
            return;
         });
      },

      organize: () => {
         let ids = [];
         const updatePosition = get().updatePosition;
         const updateFolded = get().updateFolded;
         const updateSize = get().updateSize;
         const cards = get().cards;
         const putOnTop = get().putOnTop;

         // let grid = makeGrid(ids);
         let positions = getCurrentCardsPositions(ids);
         let pairs = [];

         const { noteGrid, codeGrid, markdownGrid, imageGrid } =
            makeGrid(cards);

         for (let i = 0; i < noteGrid.length; i++) {
            const { id, size, position } = noteGrid[i];
            const card = document.getElementById(id);
            const cardRND = document.getElementById(id + "-rnd");

            updatePosition(id, position);
            updateSize(id, size);

            animate(
               card,
               {
                  x: position.left,
                  y: position.top,
               },

               { duration: 0.3 }
            );

            animate(cardRND, size, { duration: 0.3 });
         }

         for (let i = 0; i < codeGrid.length; i++) {
            const { id, size, position } = codeGrid[i];
            const card = document.getElementById(id);
            const cardRND = document.getElementById(id + "-rnd");

            updatePosition(id, position);
            updateSize(id, size);

            animate(
               card,
               {
                  x: position.left,
                  y: position.top,
               },

               { duration: 0.3 }
            );

            animate(cardRND, size, { duration: 0.3 });
         }

         for (let i = 0; i < markdownGrid.length; i++) {
            const { id, size, position } = markdownGrid[i];
            const card = document.getElementById(id);
            const cardRND = document.getElementById(id + "-rnd");

            updatePosition(id, position);
            updateSize(id, size);

            animate(
               card,
               {
                  x: position.left,
                  y: position.top,
               },

               { duration: 0.3 }
            );

            animate(cardRND, size, { duration: 0.3 });
         }

         for (let i = 0; i < imageGrid.length; i++) {
            const { id, size, position } = imageGrid[i];
            const card = document.getElementById(id);
            const cardRND = document.getElementById(id + "-rnd");

            updatePosition(id, position);
            updateSize(id, size);

            animate(
               card,
               {
                  x: position.left,
                  y: position.top,
               },

               { duration: 0.3 }
            );
         }
      },

      getCards: async (file_name) => {
         const url = select_file_url + file_name;
         // console.log(`url from getCards ${url}`);
         //what if url doesn't exit ???
         axios
            .get(url)
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
                  state.file_name = file_name;
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

      writeThisFile: async (showToast = true) => {
         const cards = get().cards;
         const getCards = get().getCards;
         const file_name = get().file_name;
         // const url = save_file_url + file_name;
         const url = `${save_file_url}${file_name}`;

         if (file_name === "") {
            toast.error("Can't save, not in a board", {});
            return;
         }
         const data = {
            cards: cards,
         };

         axios
            .post(url, data, configjson)
            .then((res) => {
               showToast && toast.success("saved", {});

               getCards(file_name);
            })
            .catch((err) => {
               showToast && toast.error("problem saving file", {});
               console.log(err);
            });
         return;
      },

      createNewFile: async (fileName) => {
         const toSend = {
            fileName: fileName,
         };
         const getCards = get().getCards;
         axios
            .post(createFile_url, toSend, configjson)
            .then((res) => {
               // result = true;
               closeDrawer();
               getCards(fileName);

               return;
            })
            .catch((err) => {
               console.log(err);
               // result = false;
               return;
            });

         // return result;
      },

      getCardsWithShortcuts: () => {
         const cardsWithShortcuts = [];
         const cards = get().cards;

         for (var card of Object.entries(cards)) {
            if (card[1].shortcut !== "") {
               cardsWithShortcuts.push({
                  id: card[0],
                  shortCut: card[1].shortcut,
               });
            }
         }

         return cardsWithShortcuts;
      },

      moveCard: () => {
         console.log("in move card");
         const cards = get().cards;
         const id = Object.entries(cards)[0][0];
         console.log("move card id :", id);
         set((state) => {
            const new_position = {
               top: 0,
               left: 100,
            };
            state.cards[id].position = new_position;
            console.log("move card element:", state.cards[id].position);
            return;
         }, true);
      },

      getArrangedCards: () => {
         const cards = get().cards;
         const cardsArray = Object.entries(cards);
         let orderedCards = [];

         for (let i = 0; i < cardsArray.length; i++) {
            const newItem = {
               id: cardsArray[i][1].id,
               top: cardsArray[i][1].position.top,
               left: cardsArray[i][1].position.left,
               total:
                  cardsArray[i][1].position.top +
                  cardsArray[i][1].position.left,
               width: cardsArray[i][1].size.width,
               height: cardsArray[i][1].size.height,
            };

            orderedCards.push(newItem);
         }

         for (let i = 0; i < orderedCards.length; i++) {
            for (let j = 0; j < orderedCards.length; j++) {
               if (orderedCards[j].total >= orderedCards[i].total) {
                  const swipe = orderedCards[i];
                  orderedCards[i] = orderedCards[j];
                  orderedCards[j] = swipe;
               } else {
                  continue;
               }
            }
         }

         set((state) => {
            state.arranged = orderedCards;
         });

         return orderedCards;
      },

      getArrangedNotesAndCodes: () => {
         const cards = get().cards;
         const cardsArray = Object.entries(cards);
         const { x, y } = getRectById("board");
         let orderedCards = [];

         for (let i = 0; i < cardsArray.length; i++) {
            const { id, position, size, type } = cardsArray[i][1];
            const distance2d = moduleCarre(x, y, position.left, position.top);
            const newItem = {
               id: id,
               top: position.top,
               left: position.left,
               total: position.top + position.left,
               // total: distance2d,
               width: size.width,
               height: size.height,
            };

            if (["note", "code"].includes(type)) {
               orderedCards.push(newItem);
            }
         }

         for (let i = 0; i < orderedCards.length; i++) {
            for (let j = 0; j < orderedCards.length; j++) {
               if (orderedCards[j].total >= orderedCards[i].total) {
                  const swipe = orderedCards[i];
                  orderedCards[i] = orderedCards[j];
                  orderedCards[j] = swipe;
               } else {
                  continue;
               }
            }
         }

         set((state) => {
            state.arrangedNotesAndCodes = orderedCards;
         });

         return orderedCards;
      },

      getSingleCard: (id) => {
         return useCardStore.getState().cards[id];
      },

      getCanvaSize: () => {
         const arranged = get().getArrangedCards();
         const fitCanva = useUiStore.getState().fitCanva;

         const topLeftCard = arranged[0];
         const bottomRightCard = arranged[arranged.length - 1];

         const canvaW =
            bottomRightCard.left + bottomRightCard.width - topLeftCard.left;
         const canvaH =
            bottomRightCard.top + bottomRightCard.height - topLeftCard.top;

         const { width, height } = getRectById("mainWrapper");
         const widthRatio = width / (canvaW * 1.3);

         console.log("getcanvasize widthRatio", widthRatio);

         console.log("difference between canva and board", canvaW, width);

         if (width > canvaW) {
            return;
         }
         fitCanva(widthRatio);
      },

      addTag: (id, tag) => {
         return set((state) => {
            state.cards[id].tags.push(tag);
         });
      },

      removeTag: (id, tag) => {
         const tags = get().cards[id].tags;
         const index = tags.indexOf(tag);

         return set((state) => {
            state.cards[id].tags.splice(index, 1);
         });
      },

      addVideoCard: (new_data) => {
         return set((state) => {
            return {
               cards: { ...state.cards, ...new_data },
            };
         });
      },

      addNoteCard: async () => {
         useUiStore.getState().selectModeOff();

         const addUiCard = useUiStore.getState().addUiCard;

         const { top, left } = getRectById("board");
         const id = uuidv4().toString();

         const mx = useUiStore.getState().mx;
         const my = useUiStore.getState().my;

         const new_note_card = {
            [id]: {
               id: id,
               type: "note",
               position: { left: mx - left, top: my - top },
               size: { width: 300, height: 200 },
               shortcut: "",
               title: "",
               data: "",
               folded: false,
               tags: [],
            },
         };

         const uicard = {
            [id]: {
               selected: false,
               top: top,
               left: left,
               width: 300,
               height: 200,
            },
         };

         addUiCard(uicard);

         set((state) => {
            state.ids = [...state.ids, id];
            state.cards = { ...state.cards, ...new_note_card };
            return;
         });
      },

      addCodeCard: () => {
         useUiStore.getState().selectModeOff();

         const addUiCard = useUiStore.getState().addUiCard;

         const { top, left } = getRectById("board");
         const id = uuidv4().toString();

         const mx = useUiStore.getState().mx;
         const my = useUiStore.getState().my;

         console.log("mx", mx, "my", my);

         const new_card = {
            [id]: {
               id: id,
               type: "code",
               position: { left: mx - left, top: my - top },
               size: {
                  width: 300,
                  height: 200,
               },
               title: "",
               shortcut: "",
               data: {
                  lang: "javascript",
                  code: "function add(a, b) {\n  return a + b;\n}",
               },
               folded: false,
               tags: [],
            },
         };

         const uicard = {
            [id]: {
               selected: false,
               top: top,
               left: left,
               width: 300,
               height: 200,
            },
         };

         addUiCard(uicard);

         set((state) => {
            state.ids = [...state.ids, id];
            state.cards = { ...state.cards, ...new_card };
            return;
         });
      },

      addMDCard: async () => {
         useUiStore.getState().selectModeOff();

         const addUiCard = useUiStore.getState().addUiCard;

         const { top, left } = getRectById("board");
         const id = uuidv4().toString();

         const mx = useUiStore.getState().mx;
         const my = useUiStore.getState().my;

         const newCard = {
            [id]: {
               id: id,
               type: "markdown",
               position: { left: mx - left, top: my - top },
               size: { width: 500, height: 700 },
               shortcut: "",
               title: "",
               data: "### Hi! Double click to Edit",
               folded: false,
               tags: [],
            },
         };

         const uicard = {
            [id]: {
               selected: false,
               top: top,
               left: left,
               width: 500,
               height: 700,
            },
         };

         addUiCard(uicard);

         set((state) => {
            state.ids = [...state.ids, id];
            state.cards = { ...state.cards, ...newCard };
            return;
         });
      },

      addImageCard: (id, dimension) => {
         useUiStore.getState().selectModeOff();

         const fileName = get().file_name;
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

      addShortcut: (id, value) => {
         return set((state) => {
            state.cards[id].shortcut = value;
         });
      },

      updateData: (id, data) => {
         const card = get().cards[id];
         // if (card.type === "note" || card.type === "markdown") {
         if (["note", "markdown"].includes(card.type)) {
            return set((state) => {
               state.cards[id].data = data;
            });
         } else if (card.type === "code") {
            return set((state) => {
               state.cards[id].data.code = data;
            });
         } else {
            console.log("this card has note type or id not found");
         }
      },

      updateTitle: (e, id) => {
         const value = e.target.value;
         return set((state) => {
            state.cards[id].title = value;
         });
      },

      updatePosition: (id, data) => {
         set((state) => {
            state.cards[id].position = data;
            return;
         });
      },

      locatePosition: (id) => {
         const element = document.getElementById(id);
         console.log(element);

         const rect = element?.getBoundingClientRect();
         console.log(rect?.top, rect.left);
      },

      updateAllPositions: () => {
         const ids = get().ids;
         const positions = getCurrentCardsPositions(ids);

         const updatePosition = get().updatePosition;
         const { top: board_t, left: board_l } = getRectById("board");

         console.log("board rect", board_l, board_t);

         for (let i = 0; i < positions.length; i++) {
            const { top, left } = positions[i];
            console.log("card rect", left, top);
         }

         for (let i = 0; i < positions.length; i++) {
            const { id, top, left } = positions[i];

            const new_position = {
               top: top - board_t,
               left: left - board_l,
            };
            updatePosition(id, { ...new_position });
         }
      },

      updatePositionSingle: (id) => {
         const board = document.getElementById("board");
         const cards = board.children;

         const card = cards[id];

         const rect = card.getBoundingClientRect();

         const { top, left } = rect;
         console.log(top, left);
      },

      updateSize: (id, data) => {
         set((state) => {
            state.cards[id].size = data;
            return;
         });
      },

      updateFolded: (id, value) => {
         return set((state) => {
            state.cards[id].folded = value;
         });
      },

      putOnTop: (id) => {
         const cards = get().cards;
         let initialCardsArray = Object.entries(cards);
         let toPutOnTop = [];
         let position = 0;

         initialCardsArray.map((item, index) => {
            if (item[0] === id) {
               position = index;
            }
         });

         toPutOnTop = initialCardsArray.splice(position, 1);
         initialCardsArray.push(...toPutOnTop);
         const newCardsObject = Object.fromEntries(initialCardsArray);

         set((state) => {
            state.cards = {
               ...newCardsObject,
            };
            return;
         });
         return;
      },

      deleteCard: (id) => {
         const { type } = get().cards[id];
         set((state) => {
            delete state.cards[id];
            return;
         });
         useUiStore.getState().deleteUiCard(id);
         if (type === "image") {
            // const url = "http://localhost:3000/deleteImage/" + id;
            const url = `http://localhost:${PORT}/deleteImage/${id}`;

            axios
               .post(
                  url,
                  {
                     action: "deleting file",
                  },
                  configjson
               )
               .then((res) => {
                  // console.log(res);
                  return;
               })
               .catch((err) => {
                  console.log(err);
               });
         }
         // get().writeThisFile(false);
      },

      deleteSelected: () => {
         const selected = useUiStore.getState().uiCards;
         const to_delete = [];
         const deleteCard = get().deleteCard;

         console.log("selected items", selected);

         for (const id in selected) {
            if (selected[id].selected) {
               console.log("item", id);
               deleteCard(id);
               to_delete.push(id);
            } else {
               continue;
            }
         }

         useUiStore.getState().toggleSelect();
         return;
      },

      toggleFoldCard: (id) => {
         const card = get().cards[id];
         const card_rnd = document.getElementById(id + "-rnd");
         if (card.folded) {
            set((state) => {
               state.cards[id].folded = false;
            });

            animate(
               card_rnd,
               {
                  ...card.size,
               },
               {
                  duration: 0.3,
               }
            );
         } else {
            const folded_size = {
               width: 300,
               height: 56,
            };

            animate(
               card_rnd,
               {
                  ...folded_size,
               },
               {
                  duration: 0.3,
               }
            );

            set((state) => {
               // state.cards[id].size = card.size
               state.cards[id].folded = true;
            });
         }
      },

      foldSelected: () => {
         const selected = useUiStore.getState().uiCards;
         const toggleFoldCard = get().toggleFoldCard;
         const cards = get().cards;

         for (const id in selected) {
            if (
               selected[id].selected &&
               !["markdown", "image"].includes(cards[id].type)
            ) {
               toggleFoldCard(id);
            } else {
               continue;
            }
         }

         useUiStore.getState().toggleSelect();

         return;
      },

      makeGroupGrid: (groupPoint, cards, gap = 56) => {
         const { x, y } = groupPoint;

         const grid = [];

         for (let i = 0; i < cards.length; i++) {
            const point = {
               top: y + (i + 1) * gap,
               left: x,
            };
            const id = cards[i];

            grid.push({
               id: id,
               ...point,
            });
         }

         return grid;
      },

      toggleGroupMode: (value = true) => {
         set((state) => {
            state.groupMode = value;
            return;
         });
      },

      groupSelected: (point) => {
         const selected = useUiStore.getState().uiCards;
         const selectedCards = [];
         const makeGroupGrid = get().makeGroupGrid;

         for (const id in selected) {
            if (selected[id].selected) {
               selectedCards.push(id);
            } else {
               continue;
            }
         }

         const grid = makeGroupGrid(point, selectedCards, 30);

         for (let i = 0; i < grid.length; i++) {
            const { id, top, left } = grid[i];
            const card = document.getElementById(id);
            set((state) => {
               state.cards[id].position = {
                  top: top,
                  left: left,
               };
               return;
            });
            animate(
               card,
               {
                  x: left,
                  y: top,
               },
               {
                  duration: 0.2,
               }
            );
         }

         get().toggleGroupMode(false);
         useUiStore.getState().selectModeOff();
      },
   }))
);

export default useCardStore;
