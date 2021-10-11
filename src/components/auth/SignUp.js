import React, { useRef, useState } from "react"
import { Card, Button, Form, Alert, InputGroup } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import { useAuth } from "../../contexts/AuthContext"
import SingUpOptions from "./SingUpOptions"
import Wrapper from "../Wrapper"

export default function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const { signup } = useAuth()

  const history = useHistory()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [className, setClassName] = useState("")

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
    <Wrapper setClassName={setClassName}>
      <Card className={`card-custom ${className}`}>
        <Card.Body className="w-100">
          <h2 className="text-center mb-5">Set up your account</h2>
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
          <SingUpOptions route="/login" />
        </Card.Body>
      </Card>
    </Wrapper>
  )
}
