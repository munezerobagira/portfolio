import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div>NotFound</div>
      <Link to="/" className="silent text-primary">
        Go to home
      </Link>
    </>
  );
}

export default NotFound;

