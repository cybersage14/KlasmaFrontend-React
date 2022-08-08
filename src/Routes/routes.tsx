import Home from "../pages/Home";
import Marketplace from "../pages/Marketplace";
import SellToken from "../pages/SellToken.tsx";
import Team from "../pages/Team";

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
  },
  {
    name: 'Sell Token',
    path: '/sell-token',
    element: <SellToken />
  },
  {
    name: 'Team',
    path: '/team',
    element: <Team />
  }
]