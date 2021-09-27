import React, { useRef, useState } from "react"
import { Card, Button, Form, Alert, InputGroup } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"

import { useAuth } from "../../contexts/AuthContext"
import CenteredContainer from "../CenteredContainer"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value

    try {
      setError("")
      setLoading(true)
      await login(email, password)
      history.push("/")
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-5">Login to your account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <InputGroup id="email">
              <InputGroup.Text>
                <i className="far fa-envelope" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Email"
                size="lg"
                type="email"
                ref={emailRef}
                required
              />
            </InputGroup>
            <InputGroup id="password" className="mt-3">
              <InputGroup.Text>
                <i className="fas fa-key" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Password"
                size="lg"
                type="password"
                ref={passwordRef}
                required
              />
            </InputGroup>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Login
            </Button>
            <Link to="/reset-password" className="btn btn-secondary w-100 mt-3">
              Forgot password?
            </Link>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account?
        <Link
          to="/signup"
          className="text-decoration-none mx-2"
          style={{ color: "#0d4afc", fontWeight: "bold" }}
        >
          Sign Up
        </Link>
      </div>
    </CenteredContainer>
  )
}
