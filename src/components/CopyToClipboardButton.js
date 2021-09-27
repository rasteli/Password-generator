import React from "react"
import { Button } from "react-bootstrap"
import { CopyToClipboard } from "react-copy-to-clipboard"

export default function CopyToClipboardButton({ text, ...rest }) {
  return (
    <CopyToClipboard text={text} {...rest}>
      <Button variant="outline-primary">
        <i className="far fa-copy" />
      </Button>
    </CopyToClipboard>
  )
}
