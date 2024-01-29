/** @format */
import { useEffect, useState } from "react";

import { ThemeProvider } from "./components/theme-provider";
// import { Toaster } from "sonner";
// import "./App.css";

// import useCardsState from "./context/CardStore.tsx";
// import useUiStore from "./context/UiStore.tsx";
// import useZoom from "./utils/handleZoom.tsx";

import Main from "./components/Main.tsx";

function App() {
   return (
      <>
         <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Main />
         </ThemeProvider>
      </>
   );
}

export default App;
