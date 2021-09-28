import React, { useRef, useState } from "react"
import { Card, Button, Form, Alert, InputGroup } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"

import { useAuth } from "../../contexts/AuthContext"
import CenteredContainer from "../CenteredContainer"

export default function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const { signup } = useAuth()
  const history = useHistory()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value
    const confirmation = passwordConfirmRef.current.value

    if (password !== confirmation) return setError("Passwords do not match")

    try {
      setError("")
      setLoading(true)
      await signup(email, password)
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
          <h2 className="mb-5">Set up your account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <InputGroup id="email">
              <InputGroup.Text>
                <i className="far fa-envelope" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Email"
                type="email"
                ref={emailRef}
                size="lg"
                required
              />
            </InputGroup>
            <InputGroup id="password" className="mt-3">
              <InputGroup.Text>
                <i className="fas fa-key" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Password"
                type="password"
                ref={passwordRef}
                size="lg"
                required
              />
            </InputGroup>
            <InputGroup id="password-confirm" className="mt-3">
              <InputGroup.Text>
                <i className="fas fa-key" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Password Confirmation"
                type="password"
                ref={passwordConfirmRef}
                size="lg"
                required
              />
            </InputGroup>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-decoration-none"
          style={{ color: "#0d4afc", fontWeight: "bold" }}
        >
          Login
        </Link>
      </div>
    </CenteredContainer>
  )
}