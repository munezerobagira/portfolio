import React from "react";
const socialMedias = [
  {
    label: "Github",
    url: "https://github.com/munezerobagira",
  },
  {
    label: "Linkedin",
    url: "https://www.linkedin.com/in/sostene",
  },
  {
    label: "Twitter",
    url: "https://twitter.com/SosteneMunezero",
  },
];
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ display: "block", width: "100%" }}>
      <ul className="social-media-links">
        {socialMedias.map((social) => (
          <li key={social.url}>
            <a href={social.url}>{social.label}</a>
          </li>
        ))}
      </ul>
      <h5 className="text-center">
        Copyright &copy;2021-{year} Munezero Bagira Sostene
      </h5>
    </footer>
  );
}

export default Footer;

