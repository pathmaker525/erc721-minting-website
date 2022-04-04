import { useRoutes } from "react-router-dom"

import Mint from "./Mint"

import Navbar from "components/Navbar"
import Footer from "components/Footer"
import ComingSoon from "components/ComingSoon"
import NotFound from "components/NotFound"

import UseScrollToTop from "hooks/useScrollToTop"

import { AppRoutes } from "constants/Ui"

const AppRouters = () => {
  let routes = useRoutes([
    { path: AppRoutes.DASHBOARD, element: <Mint /> },
    { path: AppRoutes.COMING_SOON, element: <ComingSoon /> },
    { path: AppRoutes.NOT_FOUND, element: <NotFound /> },
  ])

  return (
    <>
      <Navbar />
      <UseScrollToTop>{routes}</UseScrollToTop>
      <Footer />
    </>
  )
}

export default AppRouters
