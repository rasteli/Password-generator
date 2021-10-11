import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"

import { useAuth } from "../contexts/AuthContext"
import { FirstButton, SecondButton } from "./ActionButtons"

export default function ProfileNavbar({ del, setDel, setModal }) {
  const { logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    try {
      await logout()
      history.push("/login")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Navbar expand="sm" className="p-3 custom-navbar">
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
      <div className="d-flex align-items-center">
        <h1 className="m-3 flex-grow-1">Your passwords</h1>
        <FirstButton del={del} setDel={setDel} />
        <SecondButton del={del} setModal={setModal} />
      </div>
    </Navbar>
  )
}
