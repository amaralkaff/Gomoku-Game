import { createBrowserRouter } from "react-router-dom";
import Game from "../views/Game";
import Home from "../views/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Game />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

export default router;
