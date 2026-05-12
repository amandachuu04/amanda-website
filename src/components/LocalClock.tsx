import { useEffect, useState } from "react";

function fmt(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(d);
}

export default function LocalClock() {
  const [now, setNow] = useState(() => fmt(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(fmt(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 tabular-nums">
      <span aria-hidden className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blush-300 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-blush-400" />
      </span>
      {now} <span className="text-taupe-400">· local time</span>
    </span>
  );
}
