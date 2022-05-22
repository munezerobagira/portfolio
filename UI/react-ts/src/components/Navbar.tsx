import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav id="navbar">
        <div className="wrapper flex">
          <div id="logo">
            <h1>
              <Link to="/">Sostene</Link>
            </h1>
          </div>
          <ul className="flex height-0" id="navigation">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/work">Work</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <button className="button-primary">
                <Link to="../signin/" id="loginBtn">
                  Login
                </Link>
              </button>
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

