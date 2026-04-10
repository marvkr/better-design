"use client";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function DayFromNow({ days }: { days: number }) {
  const target = new Date();
  target.setDate(target.getDate() + days);
  return <>{DAYS[target.getDay()]}</>;
}
