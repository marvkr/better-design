const isTouchDevice =
  typeof window !== "undefined"
    ? window.matchMedia("(pointer: coarse)").matches
    : false

export function haptic(pattern: number | number[] = 50) {
  try {
    if (!isTouchDevice) return

    if ("vibrate" in navigator) {
      navigator.vibrate(pattern)
      return
    }

    // iOS haptic trick via checkbox switch element
    const label = document.createElement("label")
    label.ariaHidden = "true"
    label.style.display = "none"

    const input = document.createElement("input")
    input.type = "checkbox"
    input.setAttribute("switch", "")
    label.appendChild(input)

    try {
      document.head.appendChild(label)
      label.click()
    } finally {
      document.head.removeChild(label)
    }
  } catch {}
}
