"use client";

import { useState, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";

import type { Fragment, DesignConfig } from "@/db";
import { ICON_LIBRARY_URLS } from "@/lib/icon-libraries/urls";
import { useUpdateFragmentConfig } from "@/hooks/use-update-fragment-config";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/ui/color-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FontPicker } from "@/components/ui/font-picker";

interface ModifyEditorProps {
  fragment: Fragment;
  onConfigChange: (config: DesignConfig) => void;
}

// Default config values (dark theme from globals.css)
const DEFAULT_CONFIG: DesignConfig = {
  colors: {
    primary: "oklch(0.70 0.20 265)",
    secondary: "oklch(0.26 0.02 275)",
    accent: "oklch(0.28 0.02 275)",
    muted: "oklch(0.21 0.02 275)",
    destructive: "oklch(0.50 0.20 25)",
    background: "oklch(0.18 0.02 275)",
    foreground: "oklch(0.98 0 0)",
    card: "oklch(0.21 0.02 275)",
    cardForeground: "oklch(0.98 0 0)",
    popover: "oklch(0.21 0.02 275)",
    popoverForeground: "oklch(0.98 0 0)",
    border: "oklch(0.32 0.02 275)",
    input: "oklch(0.24 0.02 275)",
    ring: "oklch(0.70 0.20 265)",
  },
  radius: "0.5rem",
  font: {
    sans: "Inter",
    mono: "JetBrains Mono",
  },
  icons: {
    libraryId: "phosphor",
    variant: "regular",
  },
};

// Generate icon libraries from the comprehensive list, sorted alphabetically
const ICON_LIBRARIES = Object.entries(ICON_LIBRARY_URLS)
  .map(([id, info]) => ({ value: id, label: info.name }))
  .sort((a, b) => a.label.localeCompare(b.label));

const ICON_VARIANTS = [
  { value: "regular", label: "Regular" },
  { value: "bold", label: "Bold" },
  { value: "light", label: "Light" },
  { value: "duotone", label: "Duotone" },
  { value: "fill", label: "Fill" },
];

// Convert rem string to number
function remToNumber(rem: string): number {
  const match = rem.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0.5;
}

// Convert number to rem string
function numberToRem(num: number): string {
  return `${num}rem`;
}

export function ModifyEditor({ fragment, onConfigChange }: ModifyEditorProps) {
  const [config, setConfig] = useState<DesignConfig>(
    fragment.config ?? DEFAULT_CONFIG,
  );
  const [colorsOpen, setColorsOpen] = useState(true);

  const updateConfigMutation = useUpdateFragmentConfig();

  // Merge config with defaults
  const mergedConfig: DesignConfig = {
    ...DEFAULT_CONFIG,
    ...config,
    colors: { ...DEFAULT_CONFIG.colors, ...config.colors },
    font: { ...DEFAULT_CONFIG.font, ...config.font },
    icons: { ...DEFAULT_CONFIG.icons, ...config.icons },
  };

  // Debounced save to database
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateConfigMutation.mutate({
        fragmentId: fragment.id,
        config,
      });
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, fragment.id]);

  // Notify parent of config changes
  useEffect(() => {
    onConfigChange(mergedConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const updateColor = useCallback(
    (key: keyof NonNullable<DesignConfig["colors"]>, value: string) => {
      setConfig((prev) => ({
        ...prev,
        colors: { ...prev.colors, [key]: value },
      }));
    },
    [],
  );

  const updateRadius = useCallback((value: number[]) => {
    setConfig((prev) => ({
      ...prev,
      radius: numberToRem(value[0]),
    }));
  }, []);

  const updateFont = useCallback((value: string) => {
    setConfig((prev) => ({
      ...prev,
      font: { ...prev.font, sans: value },
    }));
  }, []);

  const updateMonoFont = useCallback((value: string) => {
    setConfig((prev) => ({
      ...prev,
      font: { ...prev.font, mono: value },
    }));
  }, []);

  const updateIconLibrary = useCallback((value: string) => {
    setConfig((prev) => ({
      ...prev,
      icons: { ...prev.icons, libraryId: value },
    }));
  }, []);

  const updateIconVariant = useCallback((value: string) => {
    setConfig((prev) => ({
      ...prev,
      icons: { ...prev.icons, variant: value },
    }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  return (
    <ScrollArea className="h-full bg-background">
      <div className="p-4 space-y-6">
        {/* Colors Section */}
        <Collapsible open={colorsOpen} onOpenChange={setColorsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 className="text-sm font-medium">Colors</h3>
            <span className="text-xs text-muted-foreground">
              {colorsOpen ? "−" : "+"}
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-2">
            <ColorPicker
              label="Primary"
              value={mergedConfig.colors?.primary ?? ""}
              onChange={(v) => updateColor("primary", v)}
            />
            <ColorPicker
              label="Secondary"
              value={mergedConfig.colors?.secondary ?? ""}
              onChange={(v) => updateColor("secondary", v)}
            />
            <ColorPicker
              label="Accent"
              value={mergedConfig.colors?.accent ?? ""}
              onChange={(v) => updateColor("accent", v)}
            />
            <ColorPicker
              label="Muted"
              value={mergedConfig.colors?.muted ?? ""}
              onChange={(v) => updateColor("muted", v)}
            />
            <ColorPicker
              label="Destructive"
              value={mergedConfig.colors?.destructive ?? ""}
              onChange={(v) => updateColor("destructive", v)}
            />
            <ColorPicker
              label="Background"
              value={mergedConfig.colors?.background ?? ""}
              onChange={(v) => updateColor("background", v)}
            />
            <ColorPicker
              label="Foreground"
              value={mergedConfig.colors?.foreground ?? ""}
              onChange={(v) => updateColor("foreground", v)}
            />
            <ColorPicker
              label="Card"
              value={mergedConfig.colors?.card ?? ""}
              onChange={(v) => updateColor("card", v)}
            />
            <ColorPicker
              label="Border"
              value={mergedConfig.colors?.border ?? ""}
              onChange={(v) => updateColor("border", v)}
            />
            <ColorPicker
              label="Ring"
              value={mergedConfig.colors?.ring ?? ""}
              onChange={(v) => updateColor("ring", v)}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Border Radius Section */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Border Radius</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[remToNumber(mergedConfig.radius ?? "0.5rem")]}
              onValueChange={updateRadius}
              min={0}
              max={1.5}
              step={0.25}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-16 text-right font-mono">
              {mergedConfig.radius}
            </span>
          </div>
        </div>

        {/* Typography Section */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Typography</Label>
          <div className="space-y-2">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Sans / Body</span>
              <FontPicker
                value={mergedConfig.font?.sans ?? "Inter"}
                onValueChange={updateFont}
                placeholder="Sans font..."
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Monospace / Code</span>
              <FontPicker
                value={mergedConfig.font?.mono ?? "JetBrains Mono"}
                onValueChange={updateMonoFont}
                category="monospace"
                placeholder="Mono font..."
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Icons Section */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Icons</Label>
          <div className="grid grid-cols-2 gap-2">
            <Select
              value={mergedConfig.icons?.libraryId}
              onValueChange={updateIconLibrary}
            >
              <SelectTrigger>
                <SelectValue placeholder="Library" />
              </SelectTrigger>
              <SelectContent>
                {ICON_LIBRARIES.map((lib) => (
                  <SelectItem key={lib.value} value={lib.value}>
                    {lib.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={mergedConfig.icons?.variant ?? "regular"}
              onValueChange={updateIconVariant}
            >
              <SelectTrigger>
                <SelectValue placeholder="Variant" />
              </SelectTrigger>
              <SelectContent>
                {ICON_VARIANTS.map((variant) => (
                  <SelectItem key={variant.value} value={variant.value}>
                    {variant.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={resetConfig}
          className="w-full"
        >
          <Icon icon="tabler:rotate-clockwise" className="size-4 mr-2" />
          Reset to Default
        </Button>
      </div>
    </ScrollArea>
  );
}
