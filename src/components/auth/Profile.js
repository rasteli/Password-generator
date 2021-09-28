import React, { useEffect, useState } from "react"
import { ListGroup, Form, Button, Row, Col, InputGroup } from "react-bootstrap"

import MyToast from "../MyToast"
import ProfileNavbar from "../ProfileNavbar"
import SavePasswordModal from "../SavePasswordModal"
import { FirstButton, SecondButton } from "../ActionButtons"
import CopyToClipboardButton from "../CopyToClipboardButton"

import { collections } from "../../firebase"
import { useAuth } from "../../contexts/AuthContext"
import { useDelete } from "../../contexts/DeleteContext"

export default function Profile() {
  const formattedDocs = []
  const { currentUser } = useAuth()
  const { setToDelete } = useDelete()

  const [name, setName] = useState("")
  const [docs, setDocs] = useState([])

  const [del, setDel] = useState(false)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [offcanvas, setOffcanvas] = useState(false)

  useEffect(() => {
    async function readDocs() {
      const query = collections.query

      const querySnapshot = await collections.getDocs(
        query(collections.passwords, currentUser.uid)
      )
      setDocs(querySnapshot)
    }

    readDocs()
  }, [currentUser])

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
      <div className="d-flex align-items-center">
        <h1 className="m-3 flex-grow-1">Your passwords</h1>
        <FirstButton del={del} setDel={setDel} />
        <SecondButton del={del} setOffcanvas={setOffcanvas} />
      </div>
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
                  {del && (
                    <Form.Check
                      type="checkbox"
                      style={{ marginLeft: 5 }}
                      onClick={e => setToDelete(e, doc.id)}
                    />
                  )}
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
      <SavePasswordModal show={offcanvas} setShow={setOffcanvas} />
    </>
  )
}
