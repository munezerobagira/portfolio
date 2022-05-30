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

import DashboardHome from "./Pages/Dashboard/";
import EditProfile from "./Pages/Dashboard/Profile/Edit";
import DashboardProfile from "./Pages/Dashboard/Profile";

import DashboardPosts from "./Pages/Dashboard/Posts";
import AddPost from "./Pages/Dashboard/Posts/Add";
import EditPost from "./Pages/Dashboard/Posts/Edit";

import DashboardProject from "./Pages/Dashboard/Projects";

import EditProject from "./Pages/Dashboard/Projects/Edit";
import AddProject from "./Pages/Dashboard/Projects/Add";

import Messages from "./Pages/Dashboard/Messages";

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
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Outlet />}>
            <Route index element={<DashboardProfile />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
          <Route path="posts" element={<Outlet />}>
            <Route index element={<DashboardPosts />} />
            <Route path="add" element={<AddPost />} />
            <Route path=":postId" element={<EditPost />} />
          </Route>
          <Route path="projects" element={<Outlet />}>
            <Route index element={<DashboardProject />} />
            <Route path="add" element={<AddProject />} />
            <Route path=":projectId" element={<EditProject />} />
          </Route>
          <Route path="messages" element={<Outlet />}>
            <Route index element={<Messages />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

