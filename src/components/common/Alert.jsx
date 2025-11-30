"use client"
import "../styles/alert.css"

const Alert = ({ type = "info", title, message, onClose = null }) => {
  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-content">
        <h4 className="alert-title">{title}</h4>
        <p className="alert-message">{message}</p>
      </div>
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  )
}

export default Alert
