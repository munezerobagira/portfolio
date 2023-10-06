import Link from "next/link";
const links = [
  { url: "/", label: "Home" },
  {
    url: "/about",
    label: "About",
  },
  {
    url: "/work",
    label: "Work",
  },
  {
    url: "/blog",
    path: "https://blog.mbags.space",
  },
  {
    url: "/contact-me",
    path: "Contact me",
  },
];
function Navbar() {
  return (
    <header>
      <nav id="navbar">
        <div className="wrapper flex">
          <div id="logo">
            <h1>
              <Link href="/">Sostene</Link>
            </h1>
          </div>
          <ul className="flex height-0" id="navigation">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about-me">About me</Link>
            </li>
            <li>
              <Link href="/work">Work</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          <div id="toggler">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

