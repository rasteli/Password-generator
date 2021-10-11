import React, { useLayoutEffect } from "react"
import PasswordCard from "./PasswordCard"
import useViewport from "../hooks/useViewport"
import CenteredContainer from "./CenteredContainer"

export default function Wrapper({ children, setClassName }) {
  const { innerWidth } = useViewport()
  const aboveThresh = innerWidth > 500

  useLayoutEffect(() => {
    const name = aboveThresh ? "card-auth" : ""
    setClassName(name)
  }, [aboveThresh, setClassName])

  return (
    <>
      {aboveThresh ? (
        <div className="two-cards">
          {children}
          <PasswordCard />
        </div>
      ) : (
        <CenteredContainer>{children}</CenteredContainer>
      )}
    </>
  )
}
