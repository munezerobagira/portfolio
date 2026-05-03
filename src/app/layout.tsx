import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "@/styles/App.scss";

export const metadata = {
  title: "Sostene Munezero Bagira | Cloud Engineer · Product Architect · UI/UX",
  description:
    "Cloud-Native Engineer, Product Architect, and UI/UX Designer operating out of Kigali. Building platforms that scale without breaking and perform without vulnerabilities.",
  icons: {
    icon: "/favicon.png",
  },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mx-auto w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;

