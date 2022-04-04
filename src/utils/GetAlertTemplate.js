import { positions, transitions } from "react-alert"
import {
  IoExitOutline,
  IoShareOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
} from "react-icons/io5"

export const alertOptions = {
  position: positions.BOTTOM_RIGHT,
  timeout: 3000,
  offset: "0 12px 12px 0",
  transition: transitions.SCALE,
}

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style} className="alert-wrapper flex blur-bg shadowed rounded-sm">
    <div className="alert-text flex">
      {options.type === "info" && (
        <IoShareOutline className="alert-wrapper-info" />
      )}
      {options.type === "success" && (
        <IoCheckmarkOutline className="alert-wrapper-success" />
      )}
      {options.type === "error" && (
        <IoCloseOutline className="alert-wrapper-error" />
      )}
      <span
        className={
          options.type === "info"
            ? "alert-wrapper-info"
            : options.type === "success"
            ? "alert-wrapper-success"
            : options.type === "error"
            ? "alert-wrapper-error"
            : "alert-wrapper-init"
        }
      >
        {message}
      </span>
    </div>
    <IoExitOutline onClick={close} />
  </div>
)

export default AlertTemplate
