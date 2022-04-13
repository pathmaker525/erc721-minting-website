import { LogoImage } from "resources/Images"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

import "./style.scss"

const Loading = () => (
  <div className="loading flex">
    <div className="loading-wrapper container flex flex-column">
      <AiOutlineLoading3Quarters />
      <img src={LogoImage} alt="logo" />
    </div>
  </div>
)

export default Loading
