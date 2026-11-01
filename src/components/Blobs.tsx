import { useReducedMotion } from "framer-motion";

export default function Blobs() {
  const reduce = useReducedMotion();
  const cls = reduce ? "" : "animate-blob-drift";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute -left-24 top-10 h-[28rem] w-[28rem] rounded-full opacity-60 blur-3xl ${cls}`}
        style={{ background: "radial-gradient(circle, #DCC6F7 0%, transparent 70%)" }}
      />
      <div
        className={`absolute -right-32 top-48 h-[26rem] w-[26rem] rounded-full opacity-50 blur-3xl ${cls}`}
        style={{ animationDelay: "-6s", background: "radial-gradient(circle, #F4EEFB 0%, transparent 70%)" }}
      />
      <div
        className={`absolute -bottom-24 left-1/3 h-[24rem] w-[24rem] rounded-full opacity-50 blur-3xl ${cls}`}
        style={{ animationDelay: "-3s", background: "radial-gradient(circle, #CBBCE0 0%, transparent 70%)" }}
      />
    </div>
  );
}
