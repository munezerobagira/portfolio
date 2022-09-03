import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostForm from "../../../components/PostForm";
import apiRequest from "../../../util/apiRequest";

function EditPost() {
  const { postId } = useParams();
  useEffect(() => {
    apiRequest.get("/articles/");
  });
  return (
    <PostForm
      onSuccess={() => {
        console.log("You are welcome");
      }}
    >
      <h1>Edit</h1>
    </PostForm>
  );
}

export default EditPost;

