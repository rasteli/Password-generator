import React from "react"
import { Navbar as NavbarBoo, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

import { useAuth } from "../contexts/AuthContext"

export default function Navbar() {
  const { currentUser } = useAuth()

  return (
    <NavbarBoo bg="light" className="p-3">
      <Nav>
        <Nav.Link as={Link} to={`${currentUser ? "/profile" : "/login"}`}>
          <strong>Profile</strong>
        </Nav.Link>
      </Nav>
    </NavbarBoo>
  )
}
