import { useState, useRef, useEffect } from "react"
import {
  Card,
  Form,
  InputGroup,
  Button,
  Overlay,
  Tooltip
} from "react-bootstrap"

import Navbar from "./Navbar"
import SignUpToast from "./SignUpToast"
import { generatePassword } from "../utils/Helper"
import CenteredContainer from "./CenteredContainer"
import CopyToClipboardButton from "./CopyToClipboardButton"

import useViewport from "../hooks/useViewport"

import { useAuth } from "../contexts/AuthContext"
import { collections } from "../firebase"

export default function PasswordCard() {
  const tooltipTarget = useRef()

  const { currentUser } = useAuth()
  const { innerWidth } = useViewport()

  const [value, setValue] = useState(8)
  const [show, setShow] = useState(false)
  const [password, setPassword] = useState("")
  const [pwdValue, setPwdValue] = useState("")
  const [checkboxSelected, setCheckboxSelected] = useState(false)

  const [symbols, setSymbols] = useState(false)
  const [numeric, setNumeric] = useState(false)
  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(false)

  const passwordContent = [
    "Uppercase letters",
    "Lowercase letters",
    "Symbols",
    "Numbers"
  ]

  function handleCheckChange(e) {
    const prop = e.target.alt

    switch (prop) {
      case passwordContent[0]:
        setUppercase(!uppercase)
        break

      case passwordContent[1]:
        setLowercase(!lowercase)
        break

      case passwordContent[2]:
        setSymbols(!symbols)
        break

      case passwordContent[3]:
        setNumeric(!numeric)
        break

      default:
        break
    }
  }

  useEffect(() => {
    if (uppercase || lowercase || symbols || numeric) {
      setCheckboxSelected(true)
    } else {
      setCheckboxSelected(false)
    }
  }, [uppercase, lowercase, symbols, numeric, checkboxSelected])

  async function handleSubmit(e) {
    e.preventDefault()

    const passwordProps = {
      uppercase,
      lowercase,
      symbols,
      numeric
    }

    const password = generatePassword(passwordProps, value)

    setPassword(password)
    setPwdValue(password)

    if (currentUser) {
      await collections.addDoc(collections.passwords, {
        userId: currentUser.uid,
        password
      })
    }
  }

  function handleCopy() {
    setPwdValue("Copied!")
    setTimeout(() => setPwdValue(password), 2000)
  }

  return (
    <>
      {currentUser && <Navbar />}
      <CenteredContainer>
        <Card className="card-custom password">
          <Card.Header>Generate Password</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <InputGroup className="mb-3">
                  <Form.Control value={pwdValue} readOnly />
                  <CopyToClipboardButton text={password} onCopy={handleCopy} />
                </InputGroup>
                <Card className="mb-3">
                  <Card.Header>Password length</Card.Header>
                  <Card.Body>
                    <Form.Range
                      min="8"
                      max="61"
                      value={value}
                      ref={tooltipTarget}
                      onMouseEnter={() => setShow(true)}
                      onMouseLeave={() => setShow(false)}
                      onChange={e => setValue(e.target.value)}
                    />
                    <Overlay
                      target={tooltipTarget.current}
                      placement="right"
                      show={show}
                    >
                      {props => <Tooltip {...props}>{value}</Tooltip>}
                    </Overlay>
                  </Card.Body>
                </Card>

                {passwordContent.map((label, index) => (
                  <Form.Check
                    key={index}
                    type="switch"
                    label={label}
                    alt={label}
                    onClick={handleCheckChange}
                  />
                ))}
                <Button
                  className="mt-4"
                  type="submit"
                  disabled={!checkboxSelected}
                >
                  Generate Password
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        {!currentUser && innerWidth <= 500 && <SignUpToast />}
      </CenteredContainer>
    </>
  )
}
