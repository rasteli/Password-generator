import React, { useRef } from "react"
import { Modal, Button, Form } from "react-bootstrap"

import { collections } from "../firebase"

export default function SavePasswordModal({ show, setShow }) {
  const nameRef = useRef()
  const passwordRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()

    const name = nameRef.current.value
    const password = passwordRef.current.value

    try {
      await collections.addDoc(collections.passwords, { name, password })
      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }

    setShow(false)
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <h4>Save your own password</h4>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Control
            size="lg"
            ref={nameRef}
            placeholder="Password name"
            className="my-4"
            required
          />
          <Form.Control
            size="lg"
            ref={passwordRef}
            placeholder="Password"
            className="my-4"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button size="lg" type="submit" className="w-100">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
