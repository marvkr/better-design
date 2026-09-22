import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { MenuDropdown } from "../../scripts/transitions-src/menu-dropdown"

function setup(onSelect?: (index: number) => void, items = ["Edit", "Duplicate", "Delete"]) {
  const user = userEvent.setup()
  render(
    <>
      <MenuDropdown items={items} onSelect={onSelect} />
      <button type="button">Outside</button>
    </>,
  )
  const trigger = screen.getByRole("button", { name: "Toggle menu" })
  return { user, trigger }
}

const item = (name: string) => screen.getByRole("menuitem", { name, hidden: true })

describe("MenuDropdown", () => {
  it("links the trigger and the menu", () => {
    const { trigger } = setup()
    const menu = screen.getByRole("menu", { hidden: true })
    expect(trigger).toHaveAttribute("aria-haspopup", "menu")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger).toHaveAttribute("aria-controls", menu.id)
    expect(menu).toHaveAttribute("aria-labelledby", trigger.id)
  })

  it("hides the closed menu from assistive tech and keeps items out of the Tab order", () => {
    setup()
    expect(screen.queryAllByRole("menuitem")).toHaveLength(0)
    const items = screen.getAllByRole("menuitem", { hidden: true })
    expect(items).toHaveLength(3)
    for (const el of items) expect(el).toHaveAttribute("tabindex", "-1")
  })

  it("opens on click and focuses the first item", async () => {
    const { user, trigger } = setup()
    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(item("Edit")).toHaveFocus()
  })

  it("opens from the keyboard onto the first item", async () => {
    const { user, trigger } = setup()
    trigger.focus()
    await user.keyboard("{ArrowDown}")
    expect(item("Edit")).toHaveFocus()
  })

  it("opens from the keyboard onto the last item", async () => {
    const { user, trigger } = setup()
    trigger.focus()
    await user.keyboard("{ArrowUp}")
    expect(item("Delete")).toHaveFocus()
  })

  it("moves focus into an already open menu from the trigger", async () => {
    const { user, trigger } = setup()
    await user.click(trigger)
    trigger.focus()
    await user.keyboard("{ArrowUp}")
    expect(item("Delete")).toHaveFocus()
  })

  it("closes an empty menu on Escape", async () => {
    const { user, trigger } = setup(undefined, [])
    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    await user.keyboard("{Escape}")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("moves focus with the arrow keys, Home and End, and wraps", async () => {
    const { user, trigger } = setup()
    await user.click(trigger)

    await user.keyboard("{ArrowDown}")
    expect(item("Duplicate")).toHaveFocus()
    await user.keyboard("{ArrowDown}{ArrowDown}")
    expect(item("Edit")).toHaveFocus()
    await user.keyboard("{ArrowUp}")
    expect(item("Delete")).toHaveFocus()
    await user.keyboard("{Home}")
    expect(item("Edit")).toHaveFocus()
    await user.keyboard("{End}")
    expect(item("Delete")).toHaveFocus()
  })

  it("closes on Escape and returns focus to the trigger", async () => {
    const { user, trigger } = setup()
    await user.click(trigger)
    await user.keyboard("{Escape}")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger).toHaveFocus()
  })

  it("drops the items out of the accessibility tree again once closed", async () => {
    const { user, trigger } = setup()
    await user.click(trigger)
    expect(screen.getAllByRole("menuitem")).toHaveLength(3)
    await user.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryAllByRole("menuitem")).toHaveLength(0))
  })

  it("closes when Tab moves focus out", async () => {
    const { user, trigger } = setup()
    await user.click(trigger)
    await user.tab()
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(screen.getByRole("button", { name: "Outside" })).toHaveFocus()
  })

  it("closes on a press outside", async () => {
    const { user, trigger } = setup()
    await user.click(trigger)
    await user.click(screen.getByRole("button", { name: "Outside" }))
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("reports the chosen item and closes", async () => {
    const onSelect = vi.fn()
    const { user, trigger } = setup(onSelect)
    await user.click(trigger)
    await user.keyboard("{ArrowDown}{Enter}")
    expect(onSelect).toHaveBeenCalledWith(1)
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger).toHaveFocus()
  })
})
