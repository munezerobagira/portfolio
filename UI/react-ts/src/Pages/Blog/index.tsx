import { Route, Routes } from "react-router-dom";
import Post from "./Post";
import Posts from "./Posts";

function index() {
  return (
    <>
      <Route index element={<Posts />} />
      <Route path=":articleId" element={<Post />} />
    </>
  );
}

export default index;

