"use client";

import { useState, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";

import type { Fragment, DesignConfig } from "@/db";
import { useUpdateFragmentConfig } from "@/hooks/use-update-fragment-config";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/ui/color-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FontPicker } from "@/components/ui/font-picker";

interface ModifyControlsProps {
  fragment: Fragment;
  onConfigChange: (config: DesignConfig) => void;
}

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

const ICON_LIBRARIES = [
  { value: "phosphor", label: "Phosphor" },
  { value: "lucide", label: "Lucide" },
  { value: "tabler", label: "Tabler" },
  { value: "heroicons", label: "Heroicons" },
];

function remToNumber(rem: string): number {
  const match = rem.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0.5;
}

function numberToRem(num: number): string {
  return `${num}rem`;
}

export function ModifyControls({ fragment, onConfigChange }: ModifyControlsProps) {
  const [config, setConfig] = useState<DesignConfig>(
    fragment.config ?? DEFAULT_CONFIG,
  );

  const updateConfigMutation = useUpdateFragmentConfig();

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

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  return (
    <div className="rounded-lg border bg-sidebar p-3 space-y-3">
      {/* Color row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground w-14">Colors</span>
        <div className="flex gap-1.5 flex-wrap">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="size-6 rounded-md border shadow-sm"
                style={{ backgroundColor: mergedConfig.colors?.primary }}
                title="Primary"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <ColorPicker
                label="Primary"
                value={mergedConfig.colors?.primary ?? ""}
                onChange={(v) => updateColor("primary", v)}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="size-6 rounded-md border shadow-sm"
                style={{ backgroundColor: mergedConfig.colors?.secondary }}
                title="Secondary"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <ColorPicker
                label="Secondary"
                value={mergedConfig.colors?.secondary ?? ""}
                onChange={(v) => updateColor("secondary", v)}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="size-6 rounded-md border shadow-sm"
                style={{ backgroundColor: mergedConfig.colors?.accent }}
                title="Accent"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <ColorPicker
                label="Accent"
                value={mergedConfig.colors?.accent ?? ""}
                onChange={(v) => updateColor("accent", v)}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="size-6 rounded-md border shadow-sm"
                style={{ backgroundColor: mergedConfig.colors?.background }}
                title="Background"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <ColorPicker
                label="Background"
                value={mergedConfig.colors?.background ?? ""}
                onChange={(v) => updateColor("background", v)}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="size-6 rounded-md border shadow-sm"
                style={{ backgroundColor: mergedConfig.colors?.foreground }}
                title="Foreground"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <ColorPicker
                label="Foreground"
                value={mergedConfig.colors?.foreground ?? ""}
                onChange={(v) => updateColor("foreground", v)}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="size-6 rounded-md border shadow-sm"
                style={{ backgroundColor: mergedConfig.colors?.destructive }}
                title="Destructive"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <ColorPicker
                label="Destructive"
                value={mergedConfig.colors?.destructive ?? ""}
                onChange={(v) => updateColor("destructive", v)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Radius row */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-14">Radius</span>
        <Slider
          value={[remToNumber(mergedConfig.radius ?? "0.5rem")]}
          onValueChange={updateRadius}
          min={0}
          max={1.5}
          step={0.25}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground font-mono w-12 text-right">
          {mergedConfig.radius}
        </span>
      </div>

      {/* Font row */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-14">Font</span>
        <FontPicker
          value={mergedConfig.font?.sans ?? "Inter"}
          onValueChange={updateFont}
          placeholder="Sans font..."
          className="flex-1"
        />
        <FontPicker
          value={mergedConfig.font?.mono ?? "JetBrains Mono"}
          onValueChange={updateMonoFont}
          category="monospace"
          placeholder="Mono..."
          className="w-32"
        />
      </div>

      {/* Icons row */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-14">Icons</span>
        <Select
          value={mergedConfig.icons?.libraryId}
          onValueChange={updateIconLibrary}
        >
          <SelectTrigger className="h-8 flex-1">
            <SelectValue placeholder="Icons" />
          </SelectTrigger>
          <SelectContent>
            {ICON_LIBRARIES.map((lib) => (
              <SelectItem key={lib.value} value={lib.value}>
                {lib.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={resetConfig}
          title="Reset to default"
        >
          <Icon icon="tabler:rotate-clockwise" className="size-4" />
        </Button>
      </div>
    </div>
  );
}
