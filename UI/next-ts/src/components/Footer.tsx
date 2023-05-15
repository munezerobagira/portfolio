import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ display: "block", width: "100%" }}>
      <ul className="social-media-links">
        <li>
          <a href="https://www.linkedin.com/in/sostene-munezero-bagira-755256197/">
            Linkedin
          </a>
        </li>
        <li>
          <a href="https://github.com/munezerobagira">Github</a>
        </li>
        <li>
          <a href="https://twitter.com/SosteneMunezero">Twitter</a>
        </li>
      </ul>
      <h5 className="text-center">
        Copyright &copy;2021-{year} Munezero Bagira Sostene
      </h5>
    </footer>
  );
}

export default Footer;

