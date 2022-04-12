import {
  SiTwitter,
  // SiInstagram,
  SiDiscord,
  // SiMedium
} from "react-icons/si"
import SocialLinks from "constants/Ui/SocialLinks"

import "./style.scss"

const Footer = () => (
  <div className="footer flex">
    <div className="footer-wrapper container flex">
      <span>The Shmurfs © 2022</span>
      <div className="footer-socials flex">
        <a
          className="flex"
          href={SocialLinks.Twitter}
          target="_blank"
          rel="noreferrer"
          aria-label="twitter"
        >
          <SiTwitter />
        </a>
        {/* <a
          className="flex"
          href={SocialLinks.Instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="twitter"
        >
          <SiInstagram />
        </a> */}
        <a
          className="flex"
          href={SocialLinks.Discord}
          target="_blank"
          rel="noreferrer"
          aria-label="twitter"
        >
          <SiDiscord />
        </a>
        {/* <a
          className="flex"
          href={SocialLinks.Medium}
          target="_blank"
          rel="noreferrer"
          aria-label="twitter"
        >
          <SiMedium />
        </a> */}
      </div>
    </div>
  </div>
)

export default Footer
