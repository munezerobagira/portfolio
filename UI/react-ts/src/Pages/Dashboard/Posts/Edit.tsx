import PostForm from "../../../components/PostForm";

function EditPost() {
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

