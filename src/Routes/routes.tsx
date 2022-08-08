import Home from "../pages/Home";
import Marketplace from "../pages/Marketplace";

export const routes = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'Marketplace',
    path: '/marketplace',
    element: <Marketplace />
  }
]