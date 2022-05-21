import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import { User, Dashboard } from "./Layout/";
import Home from "./Pages/About";
import Posts from "./Pages/Blog/Posts";
import Post from "./Pages/Blog/Post";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<User />}>
          <Route path="/" element={<Home />} />
          <Route path="blog" element={<Outlet />}>
            <Route index element={<Posts />} />
            <Route path=":postId" element={<Post />} />
          </Route>
        </Route>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

