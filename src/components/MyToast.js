import React from "react"
import { Toast, ToastContainer } from "react-bootstrap"

export default function MyToast({ position, title, text, show }) {
  return (
    <ToastContainer position={position} className="m-4">
      <Toast bg="secondary" onClose={() => show(false)}>
        <Toast.Header closeButton={true}>
          <strong>{title}</strong>
        </Toast.Header>
        <Toast.Body>
          <span className="text-white" style={{ fontSize: "1.1em" }}>
            {text}
          </span>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
