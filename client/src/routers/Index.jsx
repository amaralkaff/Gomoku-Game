import { createBrowserRouter } from 'react-router-dom';
import Game from '../views/Game';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Game />
    }
])

export default router;