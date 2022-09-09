import Link from "next/link";

function NotFound() {
  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h5>The page you are looking for can not be found </h5>
          <Link href="/">
            <a className="silent text-primary">Go to home</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;

