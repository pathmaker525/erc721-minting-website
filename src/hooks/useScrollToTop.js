import { useEffect } from "react"

const UseScrollToTop = ({ children }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [children])

  return children || null
}

export default UseScrollToTop
