import React from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

import { providers } from "../../firebase"
import { useAuth } from "../../contexts/AuthContext"

export default function SingUpOptions({ route }) {
  const { signInWithRedirect } = useAuth()

  async function signUpWithProvider(provider) {
    await signInWithRedirect(provider)
  }

  return (
    <div className="sign-up-options mt-5">
      <span className="text-muted mb-2">Or Sign Up using</span>
      <div>
        <Button
          bsPrefix="facebook-button"
          className="auth-button"
          onClick={() => signUpWithProvider(providers.facebook)}
        >
          <i className="fab fa-facebook-f" />
        </Button>
        <Button
          bsPrefix="google-button"
          className="auth-button"
          onClick={() => signUpWithProvider(providers.google)}
        >
          <i className="fab fa-google" />
        </Button>
      </div>

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
      <a
        href="https://kodikos-policy.vercel.app"
        className="text-decoration-none privacy-info"
      >
        <i className="fas fa-info-circle" />
      </a>
    </div>
  )
}
