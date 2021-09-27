import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"

import { useAuth } from "../contexts/AuthContext"

export default function ProfileNavbar() {
  const { logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    try {
      await logout()
      history.push("/")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Navbar bg="light" expand="sm" className="p-3">
      <Navbar.Brand>
        <strong>Profile</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link as={Link} to="/update-profile">
            Update Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            Back
          </Nav.Link>
          <Nav.Link onClick={handleLogout}>
            <i className="fas fa-sign-out-alt" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
