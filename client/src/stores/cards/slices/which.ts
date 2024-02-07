/** @format */

const useCardStore = create(
   immer((set, get) => ({
      addNoteCard: () => {
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
               size: { width: 250, height: 350 },
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

      //remove all update functions and replace with set
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

      //done
      updateTitle: (e, id) => {
         const value = e.target.value;
         return set((state) => {
            state.cards[id].title = value;
         });
      },

      //done
      updatePosition: (id, data) => {
         set((state) => {
            state.cards[id].position = data;
            return;
         });
      },

      //   updateAllPositions: () => {
      //      const ids = get().ids;
      //      const positions = getCurrentCardsPositions(ids);

      //      const updatePosition = get().updatePosition;
      //      const { top: board_t, left: board_l } = getRectById("board");

      //      console.log("board rect", board_l, board_t);

      //      for (let i = 0; i < positions.length; i++) {
      //         const { top, left } = positions[i];
      //         console.log("card rect", left, top);
      //      }

      //      for (let i = 0; i < positions.length; i++) {
      //         const { id, top, left } = positions[i];

      //         const new_position = {
      //            top: top - board_t,
      //            left: left - board_l,
      //         };
      //         updatePosition(id, { ...new_position });
      //      }
      //   },

      updatePositionSingle: (id) => {
         const board = document.getElementById("board");
         const cards = board.children;

         const card = cards[id];

         const rect = card.getBoundingClientRect();

         const { top, left } = rect;
         console.log(top, left);
      },

      //done
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
   }))
);
