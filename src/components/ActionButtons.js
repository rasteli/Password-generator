import React from "react"
import { Button } from "react-bootstrap"

import { useDelete } from "../contexts/DeleteContext"

const FirstBtn = ({ del, setDel }) => (
  <Button variant="outline-danger" onClick={() => setDel(!del)}>
    <i className={del ? "fas fa-times" : "fas fa-trash"} />
  </Button>
)

export function FirstButton({ del, setDel }) {
  return <FirstBtn del={del} setDel={setDel} />
}

export function SecondButton({ del, setOffcanvas }) {
  const { docsToDelete, deleteDocs } = useDelete()

  return del ? (
    <Button
      variant="outline-dark"
      className="mx-3"
      disabled={docsToDelete.length === 0}
      onClick={deleteDocs}
    >
      <i className="fas fa-check" />
    </Button>
  ) : (
    <Button
      variant="outline-primary"
      className="mx-3"
      onClick={() => setOffcanvas(true)}
    >
      <i className="fas fa-plus" />
    </Button>
  )
}
