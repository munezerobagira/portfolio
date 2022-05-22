import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import { User, Dashboard } from "./Layout/";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Home from "./Pages/About";
import Posts from "./Pages/Blog/Posts";
import Post from "./Pages/Blog/Post";
import Projects from "./Pages/Work/Projects";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import About from "./Pages/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<User />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/work" element={<Projects />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
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

