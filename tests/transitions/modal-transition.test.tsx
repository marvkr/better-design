import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ReactNode } from "react"
import { describe, expect, it } from "vitest"

import { MenuDropdown } from "../../scripts/transitions-src/menu-dropdown"
import { ModalTransition } from "../../scripts/transitions-src/modal-transition"

function setup(children?: ReactNode) {
  const user = userEvent.setup()
  render(
    <>
      <button type="button">Outside</button>
      <ModalTransition dialogLabel="Settings">{children}</ModalTransition>
    </>,
  )
  const trigger = screen.getByRole("button", { name: "Open modal" })
  return { user, trigger }
}

describe("ModalTransition", () => {
  it("describes the dialog it controls on the trigger", async () => {
    const { user, trigger } = setup()
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger).not.toHaveAttribute("aria-controls")

    await user.click(trigger)

    const dialog = screen.getByRole("dialog", { name: "Settings" })
    expect(dialog).toHaveAttribute("aria-modal", "true")
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(trigger).toHaveAttribute("aria-controls", dialog.id)
  })

  it("moves focus to the first control in the dialog when it opens", async () => {
    const { user, trigger } = setup(<button type="button">Inside</button>)
    await user.click(trigger)
    expect(screen.getByRole("button", { name: "Inside" })).toHaveFocus()
  })

  it("traps Tab and Shift+Tab inside the dialog", async () => {
    const { user, trigger } = setup(<button type="button">Inside</button>)
    await user.click(trigger)
    const inside = screen.getByRole("button", { name: "Inside" })
    const close = screen.getByRole("button", { name: "Close" })

    await user.tab()
    expect(close).toHaveFocus()
    await user.tab()
    expect(inside).toHaveFocus()
    await user.tab({ shift: true })
    expect(close).toHaveFocus()
  })

  it("pulls focus back when it lands outside the dialog", async () => {
    const { user, trigger } = setup()
    await user.click(trigger)
    screen.getByRole("button", { name: "Outside" }).focus()
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus()
  })

  it("closes on Escape and returns focus to the trigger", async () => {
    const { user, trigger } = setup()
    await user.click(trigger)
    await user.keyboard("{Escape}")

    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger).toHaveFocus()
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
  })

  it("returns focus to the trigger when closed with the close button", async () => {
    const { user, trigger } = setup()
    await user.click(trigger)
    // The dialog ignores pointer input until its entry class lands a frame later.
    const dialog = screen.getByRole("dialog")
    await waitFor(() => expect(dialog).toHaveClass("is-open"))
    await user.click(screen.getByRole("button", { name: "Close" }))

    expect(trigger).toHaveFocus()
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
  })

  it("skips hidden and tabindex=-1 controls when it picks the first focus", async () => {
    const { user, trigger } = setup(
      <>
        <button type="button" tabIndex={-1}>Skipped</button>
        <button type="button" style={{ visibility: "hidden" }}>Hidden</button>
        <button type="button">First real</button>
      </>,
    )
    await user.click(trigger)
    expect(screen.getByRole("button", { name: "First real" })).toHaveFocus()
  })

  it("lets a menu inside the dialog handle Escape without closing the dialog", async () => {
    const { user, trigger } = setup(<MenuDropdown items={["One", "Two"]} />)
    await user.click(trigger)
    const menuTrigger = screen.getByRole("button", { name: "Toggle menu" })
    expect(menuTrigger).toHaveFocus()

    await user.keyboard("{Enter}")
    expect(screen.getByRole("menuitem", { name: "One" })).toHaveFocus()
    await user.keyboard("{Escape}")

    expect(menuTrigger).toHaveFocus()
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(trigger).toHaveAttribute("aria-expanded", "true")

    await user.keyboard("{Escape}")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger).toHaveFocus()
  })

  it("drops aria-modal while the dialog is closing", async () => {
    const { user, trigger } = setup()
    await user.click(trigger)
    const dialog = screen.getByRole("dialog")
    await user.keyboard("{Escape}")
    expect(dialog).not.toHaveAttribute("aria-modal")
  })
})
