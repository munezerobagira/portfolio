import { useEffect } from "react";
import { useRouter } from "next/router";
import PostForm from "../../../../components/PostForm";
import apiRequest from "../../../../util/apiRequest";

function EditPost() {
  const router = useRouter();
  const { postId } = router.query;
  useEffect(() => {
    apiRequest.get("/articles/");
  });
  return (
    <PostForm
      onSuccess={() => {
        console.log("You are welcome");
      }}
    >
      <h1>Edit post </h1>
    </PostForm>
  );
}

export default EditPost;

