import "./App.css";
import React from "react";
import Switch from '@mui/material/Switch';
import { theme } from "./Components/Dark-Light/Tema"
import { useState } from "react";
import Flags from "./Components/Flags/Flags";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Country from "./Components/Flags/Country";
import NotFound from "./Components/NotFound/NotFound";


function App() {
  const [tema, setTema] = useState(theme.light);

  const toggleBtn = () => {
    if (tema === theme.light) {
      setTema(theme.dark);
    } else {
      setTema(theme.light);
    }
  };
  return (
    <div className="App" >
      <Switch onClick={toggleBtn} />
      {tema === theme.dark ? "Dark" : "Light"}
      <ThemeContext.Provider value={tema}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Flags />} />
            <Route path="/country/:cca3" element={<Country />} />
            <Route path="*"  element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
}
export const ThemeContext = React.createContext();
export default App;
