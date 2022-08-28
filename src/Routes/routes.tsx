import Blog from "../pages/Blog";
import Campaign from "../pages/Campaign";
import Home from "../pages/Home";
import Learn from "../pages/Learn";
import Login from "../pages/Login";
import Marketplace from "../pages/Marketplace";
import SellToken from "../pages/SellToken.tsx";
import Signup from "../pages/Signup";
import Team from "../pages/Team";

export const routesOfMainLayout = [
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
  },
  {
    name: 'Learn',
    path: '/learn',
    element: <Learn />
  },
  {
    name: 'Blog',
    path: '/blog',
    element: <Blog />
  },
  {
    path: '/campaigns/:id',
    element: <Campaign />
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
]