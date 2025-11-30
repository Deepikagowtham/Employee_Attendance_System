import "../styles/navbar.css"

const Navbar = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h2>Welcome back!</h2>
        <p className="navbar-date">{today}</p>
      </div>
    </nav>
  )
}

export default Navbar
