import { LogoImage } from "resources/Images"
import "./style.scss"

const Navbar = () => (
  <div className="navbar flex">
    <div className="navbar-wrapper container flex">
      <img src={LogoImage} alt="logo" />
    </div>
  </div>
)

export default Navbar
