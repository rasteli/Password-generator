import { useLayoutEffect, useState } from "react"

function getWindowWidth() {
  const { innerWidth } = window

  return { innerWidth }
}

export default function useViewport() {
  const windowWidth = getWindowWidth()
  const [newWindowWidth, setNewWindowWidth] = useState(windowWidth)

  useLayoutEffect(() => {
    function handleResize() {
      setNewWindowWidth(windowWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [windowWidth])

  return newWindowWidth
}
