import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import NoPage from "./components/NoPage/NoPage";
import "./styles.css";
import CreateGame from "./components/CreateGame/CreateGame";
import FindGame from "./components/FindGame/FindGame";
import Options from "./components/Options/Options";
import WaitingPage from "./components/WaitingPage/WaitingPage";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faPersonChalkboard,
  faComments,
  faComment,
  faRankingStar,
  faGear,
  faPause,
  faPlay,
  faUser,
  faUsers,
  faArrowCircleDown,
  faArrowCircleUp,
  faSearch,
  faPlus,
  faAnglesLeft,
  faAnglesRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faPersonChalkboard,
  faComments,
  faComment,
  faRankingStar,
  faGear,
  faPause,
  faPlay,
  faUser,
  faUsers,
  faArrowCircleDown,
  faArrowCircleUp,
  faSearch,
  faPlus,
  faAnglesLeft,
  faAnglesRight,
  faSpinner
);

export default function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="find-game" element={<FindGame />} />
            <Route path="create-game" element={<CreateGame />} />
            <Route path="options" element={<Options />} />
            <Route path="waiting-page" element={<WaitingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <>
    <App />
  </>
);
