import { createBrowserRouter } from "react-router-dom";
import Game from "../views/Game";
import Home from "../views/Home";

const router = createBrowserRouter([
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;
