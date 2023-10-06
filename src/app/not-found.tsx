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
          <Link href="/">Go to home</Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;

