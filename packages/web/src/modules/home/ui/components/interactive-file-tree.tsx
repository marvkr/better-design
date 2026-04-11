import { Icon } from "@iconify/react";

const COMPONENTS = [
  "accordion.tsx", "alert.tsx", "alert-dialog.tsx", "aspect-ratio.tsx",
  "avatar.tsx", "avatar-group.tsx", "badge.tsx", "breadcrumb.tsx",
  "button.tsx", "button-group.tsx", "calendar.tsx", "card.tsx",
  "carousel.tsx", "chart.tsx", "checkbox.tsx", "code-block.tsx",
  "code-tabs.tsx", "collapsible.tsx", "color-swatch.tsx", "combobox.tsx",
  "command.tsx", "context-menu.tsx", "copy-button.tsx", "cursor.tsx",
  "data-range-picker.tsx", "data-table.tsx", "date-picker.tsx",
  "dialog.tsx", "drawer.tsx", "dropdown-menu.tsx", "empty-state.tsx",
  "empty.tsx", "field.tsx", "file-input.tsx", "form.tsx",
  "hover-card.tsx", "icon-button.tsx", "inline-edit.tsx",
  "input.tsx", "input-group.tsx", "input-otp.tsx", "item.tsx",
  "kbd.tsx", "label.tsx", "mega-menu.tsx", "menubar.tsx",
  "multi-select.tsx", "native-select.tsx", "navigation-menu.tsx",
  "notification.tsx", "number-input.tsx", "pagination.tsx",
  "password-input.tsx", "phone-input.tsx", "popover.tsx",
  "progress.tsx", "radio-group.tsx", "rating.tsx", "resizable.tsx",
  "scroll-area.tsx", "search-input.tsx", "section-header.tsx",
  "select.tsx", "separator.tsx", "sheet.tsx", "sidebar.tsx",
  "skeleton.tsx", "slider.tsx", "sonner.tsx", "spinner.tsx",
  "stat-card.tsx", "status-indicator.tsx", "steps.tsx", "switch.tsx",
  "table.tsx", "tabs.tsx", "tag-input.tsx", "textarea.tsx",
  "time-picker.tsx", "timeline.tsx", "toast.tsx", "toaster.tsx",
  "toggle.tsx", "toggle-group.tsx", "tooltip.tsx", "typography.tsx",
  "use-toast.ts",
];

export function InteractiveFileTree() {
  return (
    <div className="mx-5 mb-5 rounded-lg border border-border/60 overflow-hidden">
      <div className="py-1.5 font-mono text-[13px] leading-relaxed">
        {/* Folder header */}
        <div className="flex items-center gap-1.5 px-3 py-[3px] text-muted-foreground/70">
          <Icon icon="tabler:folder-filled" className="size-3.5 text-primary/50 shrink-0" />
          <span>components/</span>
          <span className="text-muted-foreground/40 ml-auto text-[11px]">{COMPONENTS.length} files</span>
        </div>

        {/* Component files */}
        <div className="relative max-h-[280px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Vertical connecting line */}
          <div className="absolute left-[22px] top-0 bottom-0 w-px bg-border/60" />
          {COMPONENTS.map((file) => (
            <div
              key={file}
              className="relative flex items-center gap-1.5 py-[3px] pl-[22px] text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/30 rounded transition-colors cursor-default"
            >
              {/* Horizontal branch */}
              <div className="absolute left-[22px] top-1/2 w-2.5 h-px bg-border/60" />
              <Icon icon="tabler:file-code" className="size-3.5 shrink-0 opacity-50 ml-3.5" />
              <span>{file}</span>
            </div>
          ))}
        </div>

        {/* globals.css */}
        <div className="flex items-center gap-1.5 px-3 py-[3px] text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/30 rounded transition-colors cursor-default">
          <Icon icon="tabler:file-code" className="size-3.5 shrink-0 opacity-50" />
          <span>globals.css</span>
        </div>
      </div>
    </div>
  );
}
