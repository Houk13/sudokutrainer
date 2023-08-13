// use as function in the useEffect call in the main app 

// to prevent the right mouse menu from appearing
export const preventRightMouseMenu = () => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }
    document.addEventListener("contextmenu", handleContextMenu)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }

// prevents switching tabs when typing a number while holding the ctrlkey
// other shortcuts aren't stopped, apparantly that's bad design.
export const preventDefaultKeyboardShortcuts = () => {
  const preventDefaultShortcuts = (e: KeyboardEvent) => {
    if ((e.ctrlKey && '1234567890'.indexOf(e.key) !== -1 )|| e.altKey){
      e.preventDefault()
    }
  }
  document.addEventListener("keydown", preventDefaultShortcuts)
  return () => {
    document.removeEventListener("keydown", preventDefaultShortcuts)
  }
}