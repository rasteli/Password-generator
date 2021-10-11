import React from "react"
import { Container } from "react-bootstrap"

export default function CenteredContainer({ children }) {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {children}
      </div>
    </Container>
  )
}
