import React from "react"
import { Link } from "react-router-dom"
import { Toast, ToastContainer } from "react-bootstrap"

export default function SignUpToast() {
  return (
    <ToastContainer position="bottom-center" className="mb-4">
      <Toast>
        <Toast.Header closeButton={false}>
          <strong>Log In</strong>
        </Toast.Header>
        <Toast.Body>
          <span className="text-muted" style={{ fontSize: "1.1em" }}>
            Login to your account to manage your passwords.
          </span>
          <Link
            to="/login"
            className="btn btn-secondary w-100 mt-3"
            style={{ transform: "scale(.85)" }}
          >
            Log In
          </Link>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
