import Explore from "../views/pages/explore";
import Favorite from "../views/pages/favorite";
import Detail from "../views/pages/detail";

const routes = {
  "/": Explore, // default page
  "/explore": Explore,
  "/favorite": Favorite,
  "/detail/:id": Detail,
};

export default routes;
