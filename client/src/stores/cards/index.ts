/** @format */

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { activeSlice } from "./slices/active";
import { focusSlice } from "./slices/focus";
import { arrangedSlice } from "./slices/arranged";
import { messageSlice } from "./slices/boardMessage";
import { canvaSlice } from "./slices/canva";
import { cardsSlice } from "./slices/cards";
import { setCardSlice } from "./slices/setCard";
import { foldSlice } from "./slices/fold";
import { filesSlice } from "./slices/files";
import { groupeSlice } from "./slices/group";
import { logSlice } from "./slices/log";
import { organizeSlice } from "./slices/organize";
import { putOnTopSlice } from "./slices/putOnTop";
import { selectSlice } from "./slices/select";
import { tagsSlice } from "./slices/tags";
import { withShortcutSlice } from "./slices/withShortcuts";

export const useCardStore = create(
   immer((set, get) => ({
      ...messageSlice(set, get),
      ...logSlice(set, get),
      ...activeSlice(set, get),
      ...focusSlice(set, get),
      ...organizeSlice(set, get),
      ...cardsSlice(set, get),
      ...setCardSlice(set, get),
      ...foldSlice(set, get),
      ...tagsSlice(set, get),
      ...arrangedSlice(set, get),
      ...filesSlice(set, get),
      ...canvaSlice(set, get),
      ...groupeSlice(set, get),
      ...putOnTopSlice(set, get),
      ...selectSlice(set, get),
      ...withShortcutSlice(set, get),
   }))
);
