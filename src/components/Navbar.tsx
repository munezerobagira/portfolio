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
    label: "Blog",
    url: "https://blog.mbags.space",
  },
  {
    url: "mailto:bagira.sostenee+contactform@gmail.com",
    label: "Contact me",
  },
];
function Navbar() {
  return (
    <header className="fixed w-full flex align-center z-50 top-5 overflow-y-scroll">
      <nav className=" max-w-3xl mx-auto inline-flex  px-6 bg-black bg-opacity-70 rounded-lg overflow-y-scroll">
        <div className="flex items-center justify-between">
          <span className="px-2">
            <Link href="/" className="text-primary">
              MBAGS
            </Link>
          </span>
          <ul className="menu menu-horizontal" id="navigation">
            {navbarLinks.map((link) => (
              <li key={link.url}>
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

