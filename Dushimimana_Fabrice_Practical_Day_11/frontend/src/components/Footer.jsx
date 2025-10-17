function Footer() {
  return (
    <footer className="footer">
      <p>
        Designed by{" "}
        <span className="footer__highlight">Dushimimana Fabrice</span>
      </p>
      <span className="separator"></span>
      <p>
        Copyright &copy;{" "}
        <span className="footer__highlight">{new Date().getFullYear()}</span>,
        All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
