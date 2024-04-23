import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "@/styles/App.scss";
import Header from "@/components/Header";
function User({ children }) {
  return (
    <html>

      <body>
        <Header />
        <Navbar />
        <main className=" mx-auto w-full p-4">
          <div>{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default User;

