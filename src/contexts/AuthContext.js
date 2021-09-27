import React, { useContext, useEffect, useState } from "react"
import { auth, methods } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState()

  function signup(email, password) {
    return methods.createUserWithEmailAndPassword(auth, email, password) // change auth state
  }

  function login(email, password) {
    return methods.signInWithEmailAndPassword(auth, email, password)
  }

  function resetPassword(email) {
    return methods.sendPasswordResetEmail(auth, email)
  }

  function updateEmail(email) {
    return updateEmail(currentUser, email)
  }

  function updatePassword(password) {
    return updatePassword(currentUser, password)
  }

  function logout() {
    return methods.signOut(auth)
  }

  useEffect(() => {
    // gets called
    const unsubscribe = methods.onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
