"use client"
import "../styles/card.css"

const Card = ({ children, className = "", hoverable = false, onClick = null, padding = "lg", ...props }) => {
  return (
    <div
      className={`card card-p-${padding} ${hoverable ? "card-hover" : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
