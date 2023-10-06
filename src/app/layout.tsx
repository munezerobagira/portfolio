import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "@/styles/App.scss";
function User({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}

export default User;

