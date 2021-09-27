import React, { useEffect, useState } from "react"
import { ListGroup, Form, Button, Row, Col, InputGroup } from "react-bootstrap"

import MyToast from "../MyToast"
import ProfileNavbar from "../ProfileNavbar"
import CopyToClipboardButton from "../CopyToClipboardButton"

import { collections } from "../../firebase"

export default function Profile() {
  const formattedDocs = []

  const [name, setName] = useState("")
  const [docs, setDocs] = useState([])
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function readDocs() {
      const querySnapshot = await collections.getDocs(collections.passwords)
      setDocs(querySnapshot)
    }

    readDocs()
  }, [])

  docs.forEach(doc => {
    return formattedDocs.push(collections.formatDoc(doc))
  })

  async function handleSave(doc) {
    const docRef = collections.getRef("passwords", doc.id)

    try {
      setSaved(false)
      await collections.updateDoc(docRef, { name })
    } catch (error) {
      console.log(error.message)
    }

    setSaved(true)
  }

  return (
    <>
      <ProfileNavbar />
      <h1 className="m-3">Your passwords</h1>
      <ListGroup>
        {formattedDocs.map(doc => (
          <ListGroup.Item key={doc.id}>
            <Form.Group as={Row}>
              <Col sm="2">
                <InputGroup>
                  <Form.Control
                    defaultValue={doc.name ? doc.name : ""}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"
                  />
                  <Button
                    variant="outline-success"
                    onClick={() => handleSave(doc)}
                  >
                    <i className="far fa-save" />
                  </Button>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <Form.Control value={doc.password} readOnly />
                  <CopyToClipboardButton
                    text={doc.password}
                    onCopy={() => setCopied(true)}
                  />
                </InputGroup>
              </Col>
            </Form.Group>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {saved && (
        <MyToast
          position="bottom-start"
          title="Saved!"
          text="Password name saved successfully."
          show={setSaved}
        />
      )}
      {copied && (
        <MyToast
          position="bottom-end"
          title="Copied!"
          text="Copied password successfully."
          show={setCopied}
        />
      )}
    </>
  )
}
