import React, { useContext, useState } from "react"

import { collections } from "../firebase"

const DeleteContext = React.createContext()

export function useDelete() {
  return useContext(DeleteContext)
}

export function DeleteProvider({ children }) {
  const [docsToDelete, setDocsToDelete] = useState([])

  function setToDelete(e, docId) {
    const checked = e.target.checked

    setDocsToDelete(prevDocIds => {
      if (checked) return [...prevDocIds, docId]

      const newIds = prevDocIds.filter(doc => {
        return doc !== docId
      })

      return newIds
    })
  }

  function deleteDocs() {
    const promises = []

    docsToDelete.forEach(doc => {
      promises.push(collections.delete("passwords", doc))
    })

    Promise.all(promises)
      .then(() => {
        window.location.reload()
      })
      .catch(e => console.log(e.message))
  }

  const value = {
    docsToDelete,
    setToDelete,
    deleteDocs
  }

  return (
    <DeleteContext.Provider value={value}>{children}</DeleteContext.Provider>
  )
}
