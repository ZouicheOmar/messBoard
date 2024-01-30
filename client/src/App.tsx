/** @format */

import "./App.css";

import { ThemeProvider } from "./components/theme-provider";
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
