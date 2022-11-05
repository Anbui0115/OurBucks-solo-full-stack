import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="Eatsy-project-repo">
          <a
            className="OurBucks-link"
            href="https://github.com/Anbui0115/SOLO-project-week-21"
          >
            OurBucks
          </a>
        </div>
        <div className="Dev-info"></div>
        <div className="dev-name">
          An Bui
          <div className="dev-links">
            <a className="dev-link" href="https://github.com/Anbui0115">
              
              GitHub
            </a>
            <a
              className="dev-link"
              href="https://www.linkedin.com/in/an-bui-0115/"
            >

              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
