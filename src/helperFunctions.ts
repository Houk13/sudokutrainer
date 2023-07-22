// use as function in the useEffect call in the main app 
// to prevent the right mouse menu from appearing
export const preventRightMouseMenu = () => {
    const handleContextMenu = (e: any) => {
      e.preventDefault()
    }
    document.addEventListener("contextmenu", handleContextMenu)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }