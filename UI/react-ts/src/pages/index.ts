import About from "./About";
import Home from "./Home";

const routes = [
  {
    path: "/",
    Component: Home,
    id: "home",
  },
  {
    path: "/about",
    Component: About,
    id: "about",
  },
];
export default routes;

