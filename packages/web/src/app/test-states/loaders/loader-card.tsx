type LoaderCardProps = {
  label: string;
  description: string;
  preview: React.ReactNode;
  footer?: React.ReactNode;
};

export function LoaderCard({
  label,
  description,
  preview,
  footer,
}: LoaderCardProps) {
  return (
    <div className="flex h-[150px] flex-col items-center justify-between rounded-xl border border-[#262626] bg-[#1a1a1a] px-5 pb-[18px] pt-7 text-foreground">
      <div className="flex h-8 items-center justify-center">{preview}</div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
        {footer}
      </div>
    </div>
  );
}
