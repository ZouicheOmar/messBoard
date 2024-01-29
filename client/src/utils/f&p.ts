/** @format */

export const selectCardById = (id) => {
   const card = document.getElementById(id);
   const { height: cardHeight } = card?.getBoundingClientRect();
   const focusArea = card?.getElementsByTagName("textarea")[0];
   // const button = card?.getElementsByTagName("button")[0];
   const button = document.getElementById(`${id}-foldButton`);
   if (cardHeight <= 56) {
      button.click();
      setTimeout(() => {
         button.click();
         setTimeout(() => {
            focusArea?.focus();
         }, 400);
      }, 100);
   } else {
      focusArea?.focus();
   }
   return;
};

export const activateTextAreaById = (id) => {
   const textArea = document.getElementById(`${id}-textarea`);
   textArea?.focus();
   return;
};

export const pixelToNum: (pixels: string | number) => number = (pixels) => {
   if (typeof pixels === "number") {
      return pixels;
   } else {
      return Number(pixels.replace("px", ""));
   }
};

export const orderArray = (v: number[]) => {
   let V = v;
   for (let i = 0; i < V.length; i++) {
      if (typeof V[i] !== "number") {
         // console.log(V[i], 'is non number value, deleted')
         V.splice(i, 1);
         continue;
      }
      for (let j = 0; j < V.length; j++) {
         if (V[j] >= V[i]) {
            let swipe = V[i];
            V[i] = V[j];
            V[j] = swipe;
         } else {
            continue;
         }
      }
   }
   return V;
};

export const getRectById = (id) => {
   const element = document.getElementById(id);
   const rect = element?.getBoundingClientRect();

   return rect;
};

export const openDrawer = () => {
   const drawer_trigger_button = document.getElementById("drawerMenu");

   setTimeout(() => {
      drawer_trigger_button.click();
   }, 200);
};

export const closeDrawer = () => {
   const drawer_close_button = document.getElementById("drawer_close_button");

   setTimeout(() => {
      drawer_close_button.click();
   }, 200);
};

export const moduleCarre = (x_0, y_0, x_1, y_1) => {
   const result = Math.sqrt((x_1 - x_0) ** 2 + (y_1 - y_0) ** 2);
   return result;
};

export const isEqual = (x, y) => {
   const ok = Object.keys,
      tx = typeof x,
      ty = typeof y;
   return x && y && tx === "object" && tx === ty
      ? ok(x).length === ok(y).length &&
           ok(x).every((key) => isEqual(x[key], y[key]))
      : x === y;
};

export const makeGridOG = (arr) => {
   const ids = arr;
   const number_of_points = ids.length;

   const { height, width } = getRectById("mainWrapper");

   const grid_height = height >= 740 ? height : 700;

   const card_height = 100;
   const card_width = 300;
   const gap = 20;

   const number_of_cards_per_row = Math.floor(
      grid_height / (card_height + gap)
   );

   const points = [];

   let top = 0;
   let left = -1;

   for (let i = 0; i < number_of_points; i++) {
      if (i % number_of_cards_per_row === 0) {
         top = 0;
         left += 1;
      }

      const point = {
         top: top * (card_height + gap),
         left: left * (card_width + gap),
      };

      points.push(point);

      top += 1;
   }

   return points;
};

export const getCurrentCardsPositions = (arr) => {
   const ids = arr;

   const board = document.getElementById("board");
   const cards = board.children;

   const positions = [];

   for (let i = 0; i < cards.length; i++) {
      const id = cards[i].id;
      if (ids.includes(id)) {
         const { top, left } = cards[i].getBoundingClientRect();
         const position = {
            id: id,
            top: top,
            left: left,
         };

         positions.push(position);
      }
   }

   return positions;
};

const makeNoteCardsGrid = (cards) => {
   if (cards.length >= 1) {
      cols.note += 1;
      let currentPoint;

      let currentHeight = 0;

      for (let i = 0; i < cards.length; i++) {
         let { id, size, position, folded } = cards[i];
         const { width, height } = size;

         let currentCardSize = { ...size };

         if (!folded) {
            if (height >= 200) {
               currentCardSize = {
                  ...currentCardSize,
                  height: 200,
               };
            }
         } else {
            currentCardSize = {
               height: 56,
               width: currentCardSize.width,
            };
         }

         if (width >= 300) {
            currentCardSize = {
               ...currentCardSize,
               width: 300,
            };
         }

         currentPoint = {
            top: currentHeight,
            left: indexJ * (300 + gap),
         };

         const point = {
            id: id,
            size: currentCardSize,
            position: currentPoint,
         };

         noteGrid.push(point);

         currentHeight += currentCardSize.height + gap;

         indexI += 1;
         if (currentHeight >= 700) {
            indexI = 0;
            currentHeight = 0;
            indexJ += 1;
            cols.note += 1;
         }
      }
   }

   return cardGrid;
};

export const makeGrid = (cards) => {
   let data = [];
   let noteElements = [],
      codeElements = [],
      imageElements = [],
      markdownElements = [];

   let noteGrid = [],
      codeGrid = [],
      imageGrid = [],
      markdownGrid = [];

   const { height, width } = getRectById("mainWrapper");
   const gridHeight = height >= 740 ? height : 700;

   for (let id in cards) {
      const { id: cardId, size, position, folded, type } = cards[id];
      const element = {
         id: cardId,
         size: size,
         position: position,
         folded: folded,
         type: type,
      };
      if (type === "note") {
         noteElements.push(element);
      } else if (type === "code") {
         codeElements.push(element);
      } else if (type === "markdown") {
         markdownElements.push(element);
      } else if (type === "image") {
         imageElements.push(element);
      } else {
         console.log(
            "unkown type, element id is ",
            document.getElementById(id)
         );
      }
   }

   let indexI = 0;
   let indexJ = 0;

   let cols = {
      note: 0,
      code: 0,
      md: 0,
      img: 0,
   };

   const gap = 10;

   let currentWidth = 0;

   if (noteElements.length >= 1) {
      cols.note += 1;
      let currentPoint;

      let currentHeight = 0;

      for (let i = 0; i < noteElements.length; i++) {
         let { id, size, position, folded } = noteElements[i];
         const { width, height } = size;

         let currentCardSize = { ...size };

         if (!folded) {
            if (height >= 200) {
               currentCardSize = {
                  ...currentCardSize,
                  height: 200,
               };
            }
         } else {
            currentCardSize = {
               height: 56,
               width: currentCardSize.width,
            };
         }

         if (width >= 300) {
            currentCardSize = {
               ...currentCardSize,
               width: 300,
            };
         }

         currentPoint = {
            top: currentHeight,
            left: indexJ * (300 + gap),
         };

         const point = {
            id: id,
            size: currentCardSize,
            position: currentPoint,
         };

         noteGrid.push(point);

         currentHeight += currentCardSize.height + gap;

         indexI += 1;
         if (currentHeight >= 700) {
            indexI = 0;
            currentHeight = 0;
            indexJ += 1;
            cols.note += 1;
         }
      }
   }

   indexJ += 1;
   currentWidth = indexJ * (gap + 300);

   let codeStartX = 0;
   if (noteGrid.length > 0) {
      codeStartX = noteGrid[noteGrid.length - 1].position.left + 300;
   }

   if (codeElements.length >= 1) {
      let currentPoint;
      cols.code = 1;

      let currentHeight = 0;

      for (let i = 0; i < codeElements.length; i++) {
         let { id, size, position, folded } = codeElements[i];
         const { width, height } = size;

         let currentCardSize = { ...size };

         //size
         if (!folded) {
            if (height >= 200) {
               currentCardSize = {
                  ...currentCardSize,
                  height: 200,
               };
            }
         } else {
            currentCardSize = {
               height: 56,
               width: currentCardSize.width,
            };
         }

         if (width >= 300) {
            currentCardSize = {
               ...currentCardSize,
               width: 300,
            };
         }

         //position
         currentPoint = {
            top: currentHeight,
            left: indexJ * (300 + gap),
         };

         const point = {
            id: id,
            size: currentCardSize,
            position: currentPoint,
         };

         codeGrid.push(point);

         currentHeight += currentCardSize.height + gap;

         indexI += 1;
         if (currentHeight >= 700) {
            cols.code = 1;
            indexI = 0;
            currentHeight = 0;
            indexJ += 1;
         }
      }
   }

   indexJ += 1;
   currentWidth = indexJ * (gap + 300);

   let mdCol = 0;

   let markdownStartLeft = codeStartX;
   if (codeGrid.length > 0) {
      markdownStartLeft =
         codeGrid[codeGrid.length - 1].position.left +
         codeGrid[codeGrid.length - 1].size.width +
         10;
   }
   if (markdownElements.length >= 1) {
      let currentPoint;
      let currentHeight = 0;

      const { height, width } = getRectById("mainWrapper");
      const mdCardHeight = 300;

      for (let i = 0; i < markdownElements.length; i++) {
         let { id, size, position, folded } = markdownElements[i];
         const { width, height } = size;

         let currentCardSize = { ...size };

         //size
         if (!folded) {
            if (height >= mdCardHeight) {
               currentCardSize = {
                  ...currentCardSize,
                  height: mdCardHeight,
               };
            }
         }

         if (width >= 450) {
            currentCardSize = {
               ...currentCardSize,
               width: 450,
            };
         }

         //position
         currentPoint = {
            top: currentHeight,
            // left: (300 + gap) * (cols.code + cols.note) + cols.md * (450 + gap),
            left: markdownStartLeft + mdCol * (450 + gap),
         };

         const point = {
            id: id,
            size: currentCardSize,
            position: currentPoint,
         };

         markdownGrid.push(point);

         currentHeight += currentCardSize.height + gap;

         indexI += 1;
         if (currentHeight >= 1.5 * height) {
            mdCol += 1;
            indexI = 0;
            currentHeight = 0;
            indexJ += 1;
            cols.md += 1;
         }
      }
   }

   indexJ += 1;
   currentWidth += mdCol * 450;

   let imageStartLeft = markdownStartLeft;
   if (markdownGrid.length > 0) {
      imageStartLeft =
         markdownGrid[markdownGrid.length - 1].position.left +
         markdownGrid[markdownGrid.length - 1].size.width +
         10;
   }
   if (imageElements.length >= 1) {
      const { height, width } = getRectById("mainWrapper");
      let currentHeight = 0;
      let cols = 0;
      let prevImageEnd = 0;
      for (let i = 0; i < imageElements.length; i++) {
         let { id, size, position, folded } = imageElements[i];
         const { width: imgW, height: imgH } = size;

         let newImgSize = { ...size };

         const maxImageWidht = 400;

         if (imgW >= maxImageWidht) {
            newImgSize = {
               width: 400,
               height: (400 / imgH) * imgW,
            };
         }

         const newImgPosition = {
            left: imageStartLeft + cols * (maxImageWidht + 10),
            top: prevImageEnd,
         };

         const element = {
            id: id,
            size: newImgSize,
            position: newImgPosition,
         };

         prevImageEnd += newImgSize.height + 10;
         currentHeight += height;

         imageGrid.push(element);

         console.log("currentHeight", currentHeight);

         if (prevImageEnd >= 700) {
            cols += 1;
            prevImageEnd = 0;
         }
      }
   }

   return { noteGrid, codeGrid, markdownGrid, imageGrid };
};
