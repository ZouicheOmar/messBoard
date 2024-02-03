/** @format */

import { ThemeProvider } from "./components/theme-provider";
import ReactDOM from "react-dom/client";
import Main from "./components/Main.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Main />
   </ThemeProvider>
);
