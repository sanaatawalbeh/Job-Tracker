import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} Job Tracker. All rights reserved.
    </footer>
  );
}

export default Footer;
