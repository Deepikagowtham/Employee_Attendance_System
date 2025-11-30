import { forwardRef } from "react"
import "../styles/input.css"

const Input = forwardRef(
  ({ label, type = "text", placeholder = "", error = "", required = false, className = "", ...props }, ref) => {
    return (
      <div className="input-group">
        {label && (
          <label className="input-label">
            {label} {required && <span className="required">*</span>}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`input ${error ? "input-error" : ""} ${className}`}
          ref={ref}
          {...props}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    )
  },
)

Input.displayName = "Input"

export default Input
