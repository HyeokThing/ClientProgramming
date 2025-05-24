import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Todos from "./Todos";
import Posts from "./Posts";
import PostView from "./PostView";

const MenuRouter = () => {
  return (
    <div>
      <div className="mt-2">
        <Link to="/posts" className="mx-3">
          Post List
        </Link>
        <Link to="/todos" className="mx-3">
          Todo List
        </Link>
        <hr />
      </div>
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/posts/:id" element={<PostView />} />
      </Routes>
    </div>
  );
};

export default MenuRouter;
