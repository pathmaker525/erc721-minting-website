import { LogoImage } from "resources/Images"
import { GiSun } from "react-icons/gi"

import "./style.scss"

const Loading = () => (
  <div className="loading flex">
    <div className="loading-wrapper container flex flex-column">
      <GiSun />
      <img src={LogoImage} alt="logo" />
    </div>
  </div>
)

export default Loading
