import React from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

import { useAuth } from "../../contexts/AuthContext"

export default function SingUpOptions({ route }) {
  const { signInWithRedirect } = useAuth()

  async function signUpWithProvider() {
    await signInWithRedirect()
  }

  return (
    <div className="sign-up-options mt-5">
      <span className="text-muted mb-2">Or Sign Up using</span>
      <Button bsPrefix="google-button" onClick={signUpWithProvider}>
        <i className="fab fa-google" />
      </Button>

      <span className="text-muted sign-up">
        Or
        <Link
          to={route}
          className="text-decoration-none mx-2"
          style={{ color: "#0d4afc", fontWeight: "bold" }}
        >
          {route === "/signup" ? "Sign Up" : "Log In"}
        </Link>
      </span>
    </div>
  )
}
