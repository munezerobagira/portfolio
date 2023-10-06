import Link from "next/link";
const navbarLinks = [
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
      <nav className="fixed w-full top-0 left-0">
        <div className="flex items-center justify-center">
          <span className="px-2">
            <Link href="/">Sostene</Link>
          </span>
          <ul className="menu menu-horizontal" id="navigation">
            {navbarLinks.map((link) => (
              <li>
                <Link href={link.url}>{link.label}</Link>
              </li>
            ))}
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

