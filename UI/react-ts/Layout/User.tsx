import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
function User({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default User;

