import React from "react"
import { Navbar as NavbarBoo, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

import { useAuth } from "../contexts/AuthContext"

export default function Navbar() {
  const { currentUser } = useAuth()

  return (
    <NavbarBoo className="p-3 custom-navbar">
      <Nav>
        <Nav.Link as={Link} to={`${currentUser ? "/profile" : "/login"}`}>
          <h1>Profile</h1>
        </Nav.Link>
      </Nav>
    </NavbarBoo>
  )
}
