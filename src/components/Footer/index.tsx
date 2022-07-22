import { ReactComponent as Heart } from "../../assets/images/heart.svg";

function Footer() {
  return (
    <footer className="footer">
      <span className="footer__text">
        from
        <a className="footer__link" href="https://binary-studio.com" target="blank">
          binary studio
        </a>
        with
        <Heart className="footer__icon"></Heart>
      </span>
    </footer>
  );
}

export default Footer;
