import React, { useRef, useState } from "react"
import { Card, Button, Form, Alert, InputGroup } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"

import { useAuth } from "../../contexts/AuthContext"
import SingUpOptions from "./SingUpOptions"
import Wrapper from "../Wrapper"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()

  const { login } = useAuth()

  const history = useHistory()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [className, setClassName] = useState("")

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
    <Wrapper setClassName={setClassName}>
      <Card className={`card-custom ${className}`}>
        <Card.Body className="w-100">
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="text-muted mb-3">
            By creating an account, you can save and manage your generated
            passwords.
          </div>
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
            <InputGroup id="password" className="mt-3 mb-1">
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
            <Link to="/reset-password" className="text-muted forgot-pas">
              Forgot password?
            </Link>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Login
            </Button>
          </Form>
          <SingUpOptions route="/signup" />
        </Card.Body>
      </Card>
    </Wrapper>
  )
}
