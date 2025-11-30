import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import "../styles/layout.css"

const Layout = ({ children, userRole }) => {
  return (
    <div className="layout">
      <Sidebar userRole={userRole} />
      <div className="layout-main">
        <Navbar />
        <main className="layout-content">{children}</main>
      </div>
    </div>
  )
}

export default Layout
