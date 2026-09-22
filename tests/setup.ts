import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

afterEach(() => {
  cleanup()
  // Each component injects its <style> once per document; start every test clean.
  document.head.innerHTML = ""
})
