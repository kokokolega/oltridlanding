import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowUpRight,
  Mic,
  Plus,
  Smile,
  Image as ImageIcon,
  FileText,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Instagram,
  Youtube,
  Zap,
  MessageSquare,
  Presentation,
  Network,
  Globe,
  Workflow,
  PenTool,
  Table2,
  ArrowRight,
  ArrowDown,

} from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import { subscribeEmail } from "@/lib/subscribe.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Landing,
});

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .8s ease ${delay}ms, transform .8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Contact", href: "#contact" },
    { label: "Switch", href: "#switch" },
  ];

  return (
    <header className="sticky top-0 z-40 glass-soft border-b border-white/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <img src={logo.url} alt="Oltrid AI" className="h-7 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-lime after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href="https://app.oltrid.com/auth"
            className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
          >
            Login / Signup
          </a>
        </div>
        <button
          className="md:hidden p-2 rounded-md hover:bg-white/50"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/40 glass-soft animate-fade-up">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://app.oltrid.com/auth"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium"
            >
              Login / Signup
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

const aiPrompts = [
  "Plan my startup",
  "Create a PRD",
  "Generate a presentation",
  "Remember this forever",
  "Build a workflow",
  "Create a website",
];


function useTypingPlaceholder(active: boolean) {
  const [text, setText] = useState("");
  const idxRef = useRef(0);
  const charRef = useRef(0);
  const phaseRef = useRef<"typing" | "pause" | "erasing" | "wait">("typing");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setText("");
      charRef.current = 0;
      phaseRef.current = "typing";
      return;
    }

    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const prompt = aiPrompts[idxRef.current];
      const phase = phaseRef.current;

      if (phase === "typing") {
        if (charRef.current < prompt.length) {
          charRef.current += 1;
          setText(prompt.slice(0, charRef.current));
          // natural typing speed with occasional human pause
          const delay = Math.random() < 0.12 ? rand(280, 520) : rand(55, 120);
          timerRef.current = setTimeout(tick, delay);
        } else {
          phaseRef.current = "pause";
          timerRef.current = setTimeout(tick, 1600);
        }
      } else if (phase === "pause") {
        phaseRef.current = "erasing";
        timerRef.current = setTimeout(tick, 60);
      } else if (phase === "erasing") {
        if (charRef.current > 0) {
          charRef.current -= 1;
          setText(prompt.slice(0, charRef.current));
          timerRef.current = setTimeout(tick, rand(25, 55));
        } else {
          phaseRef.current = "wait";
          idxRef.current = (idxRef.current + 1) % aiPrompts.length;
          timerRef.current = setTimeout(tick, 450);
        }
      } else {
        phaseRef.current = "typing";
        timerRef.current = setTimeout(tick, 200);
      }
    };

    timerRef.current = setTimeout(tick, 400);

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active]);

  return text;
}

function ChatInput() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const animated = useTypingPlaceholder(!focused && value.length === 0);
  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    window.location.href = "https://app.oltrid.com/auth";
  };
  return (
    <form onSubmit={submit} className="relative mx-auto w-full max-w-2xl">
      <div className="chat-border-glow">
        <div className="relative rounded-[calc(1.5rem-1.5px)] glass px-4 py-3">
          <div className="relative w-full py-2">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder=" "
              className="relative z-10 w-full bg-transparent outline-none text-sm md:text-base font-mono placeholder:text-muted-foreground/70"
              aria-label="Ask Oltrid AI"
            />
            {!focused && value.length === 0 && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center text-sm md:text-base font-mono text-muted-foreground/70"
              >
                {animated}
                <span className="ai-cursor ml-0.5" />
              </span>
            )}
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <button type="button" onClick={submit} className="p-1.5 rounded-full hover:bg-white/50 transition" aria-label="Attach">
                <Plus className="h-4 w-4" />
              </button>
              <button type="button" onClick={submit} className="p-1.5 rounded-full hover:bg-white/50 transition" aria-label="Emoji">
                <Smile className="h-4 w-4" />
              </button>
              <button type="button" onClick={submit} className="p-1.5 rounded-full hover:bg-white/50 transition" aria-label="Image">
                <ImageIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground text-xs font-mono">
              <button type="button" onClick={submit} className="inline-flex items-center gap-1 hover:text-foreground transition" aria-label="Default mode">
                <FileText className="h-3.5 w-3.5" /> Default
              </button>
              <button type="button" onClick={submit} className="inline-flex items-center gap-1 hover:text-foreground transition" aria-label="General mode">
                <Zap className="h-3.5 w-3.5" /> General
              </button>
              <button type="submit" className="p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition" aria-label="Send">
                <Mic className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}


function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-20 md:pb-28 text-center">
        <Reveal>
          <a
            href="https://app.oltrid.com/auth"
            className="inline-flex items-center gap-2 rounded-full bg-lime/90 text-primary px-4 py-1.5 text-xs font-mono hover:opacity-90 transition"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Join Early Access
          </a>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-6 font-display font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground max-w-4xl mx-auto">
            Your AI That{" "}
            <span className="relative inline-block">
              <span className="relative z-10 px-2">Remembers</span>
              <span
                aria-hidden
                className="absolute inset-0 -skew-y-1 bg-lime rounded-md"
                style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
              />
            </span>{" "}
            Everything and Gets Work Done.
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 text-sm md:text-base font-mono text-muted-foreground max-w-2xl mx-auto">
            From idea to execution-chat, documents, files, automation, and memory in one place.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div id="demo" className="mt-10 scroll-mt-24">
            <ChatInput />
          </div>
        </Reveal>

      </div>
    </section>
  );
}

const whyItems = [
  { n: "01", title: "NEVER LOSE CONTEXT", desc: "Pick up any project exactly where you left it - Oltrid carries the full history with you." },
  { n: "02", title: "ONE AI THAT REMEMBERS EVERYTHING", desc: "Your decisions, files and preferences stay in memory, so you never repeat yourself again." },
  { n: "03", title: "STOP SWITCHING BETWEEN APPS", desc: "Docs, decks, sheets, sites and automations all live inside one chat window." },
  { n: "04", title: "COMPLETE WORK FASTER", desc: "Go from idea to finished deliverable in a single conversation, not a dozen tabs." },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full glass-soft px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-lime" />
      {children}
    </span>
  );
}

function Why() {
  return (
    <section id="product" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 scroll-mt-20">
      <div className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem] glass p-6 sm:p-10 md:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-lime/25 blur-3xl"
        />
        <div className="relative grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <Reveal>
            <div className="min-w-0">
              <Eyebrow>Why Oltrid</Eyebrow>
              <h2 className="mt-4 font-display font-bold text-[2rem] leading-[0.95] sm:text-5xl md:text-6xl tracking-tight">
                Why people
                <br className="hidden sm:block" /> choose Oltrid
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-sm md:text-base text-muted-foreground md:max-w-sm md:ml-auto md:text-right">
              Not another chatbot. A workspace with memory that actually finishes the work with you.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-10 md:mt-14 grid gap-4 sm:gap-5 sm:grid-cols-2">
          {whyItems.map((it, i) => (
            <Reveal key={it.n} delay={i * 90}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass glass-highlight p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:glass-glow">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 w-0 bg-lime transition-all duration-500 group-hover:w-full"
                />
                <span className="font-mono text-xs text-muted-foreground">{it.n}</span>
                <h3 className="mt-4 font-display font-bold uppercase tracking-tight text-lg sm:text-xl leading-tight max-w-[20ch]">
                  {it.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground max-w-[34ch]">{it.desc}</p>
                <ArrowUpRight className="mt-6 h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-lime group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


const suiteItems = [
  { label: "Chat", Icon: MessageSquare, desc: "One thread that remembers it all." },
  { label: "Documents", Icon: FileText, desc: "Drafts, specs and PRDs in seconds." },
  { label: "Presentations", Icon: Presentation, desc: "Decks built from your context." },
  { label: "Mind Maps", Icon: Network, desc: "Turn thinking into structure." },
  { label: "Websites", Icon: Globe, desc: "Describe it, ship a live page." },
  { label: "Workflows", Icon: Workflow, desc: "Automations without the wiring." },
  { label: "Canvas", Icon: PenTool, desc: "Sketch ideas beside your work." },
  { label: "Spreadsheets", Icon: Table2, desc: "Numbers that stay in sync." },
];

function Suite() {
  const [active, setActive] = useState(1);
  const { ref, shown } = useReveal();

  useEffect(() => {
    if (!shown) return;
    const id = setInterval(() => setActive((a) => (a + 1) % suiteItems.length), 2200);
    return () => clearInterval(id);
  }, [shown]);

  return (
    <section id="features" ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 scroll-mt-24">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>The suite</Eyebrow>
          <h2 className="mt-4 font-display font-bold text-[2rem] sm:text-4xl md:text-5xl tracking-tight leading-[1.05]">
            One chat. Everything you can create.
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">
            Ask once - Oltrid builds it, remembers it, and keeps improving it.
          </p>
        </div>
      </Reveal>
      <div className="mt-10 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {suiteItems.map((it, i) => {
          const on = i === active;
          return (
            <Reveal key={it.label} delay={i * 50}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group h-full w-full text-left rounded-2xl border p-4 sm:p-6 flex flex-col items-start gap-3 transition-all duration-500 ${
                  on
                    ? "border-lime bg-card -translate-y-1 shadow-[0_24px_60px_-30px_oklch(0.9_0.24_130)]"
                    : "border-border bg-card/70 hover:-translate-y-1 hover:border-lime/60"
                }`}
              >
                <span
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-500 ${
                    on ? "bg-lime text-primary" : "bg-surface text-foreground"
                  }`}
                >
                  <it.Icon className="h-5 w-5" />
                </span>
                <span className="font-display font-semibold text-sm sm:text-base">{it.label}</span>
                <span className="text-xs text-muted-foreground leading-relaxed">{it.desc}</span>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}


const memorySteps = [
  { day: "Monday", action: "Create roadmap", detail: "You outline the Q3 plan in chat." },
  { day: "Wednesday", action: "Continue roadmap", detail: "No re-explaining. Oltrid picks up the thread." },
  { day: "Friday", action: "Generate presentation", detail: "Built from everything discussed all week." },
];

function Memory() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
      <div className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem] glass p-6 sm:p-10 md:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-lime/20 blur-3xl"
        />
        <Reveal>
          <div className="relative">
            <Eyebrow>Memory</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-[2rem] sm:text-4xl md:text-5xl tracking-tight max-w-3xl leading-[1.05]">
              Memory-centric actions
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl">
              One week, one thread. Oltrid already remembers everything - automatically.
            </p>
          </div>
        </Reveal>

        <ol className="relative mt-10 md:mt-14 grid gap-4 md:gap-6 md:grid-cols-3">
          <span
            aria-hidden
            className="hidden md:block absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-lime/0 via-lime/60 to-lime/0"
          />
          {memorySteps.map((s, i) => (
            <Reveal key={s.day} delay={i * 140}>
              <li className="group relative h-full rounded-2xl glass glass-highlight p-6 transition-all duration-500 hover:-translate-y-1.5 hover:glass-glow">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full glass-soft px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-muted-foreground group-hover:bg-lime group-hover:text-primary transition-colors">
                    {s.day}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                </div>
                <div className="mt-5 flex items-start gap-2">
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-lime" />
                  <h3 className="font-display font-bold text-lg sm:text-xl leading-tight">{s.action}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{s.detail}</p>
                <span className="mt-6 block h-1 rounded-full bg-border overflow-hidden">
                  <span
                    className="block h-full rounded-full bg-lime transition-all duration-700"
                    style={{ width: `${((i + 1) / memorySteps.length) * 100}%` }}
                  />
                </span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}


const oldStack = [
  { name: "ChatGPT", color: "bg-emerald-100 text-emerald-700" },
  { name: "Google Docs", color: "bg-blue-100 text-blue-700" },
  { name: "Canva", color: "bg-teal-100 text-teal-700" },
  { name: "Notion", color: "bg-stone-200 text-stone-700" },
  { name: "Drive", color: "bg-yellow-100 text-yellow-700" },
  { name: "Zapier", color: "bg-orange-100 text-orange-700" },
];

function BeforeAfter() {
  const [active, setActive] = useState(0);
  const { ref, shown } = useReveal();

  useEffect(() => {
    if (!shown) return;
    const id = setInterval(() => setActive((a) => (a + 1) % (oldStack.length + 1)), 1100);
    return () => clearInterval(id);
  }, [shown]);

  const collapsed = active === oldStack.length;

  return (
    <section id="switch" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 scroll-mt-24">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem] glass p-6 sm:p-10 md:p-14"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <Eyebrow>The switch</Eyebrow>
            <h2 className="mt-5 font-display font-bold text-[2rem] sm:text-4xl md:text-5xl tracking-tight leading-[1.05]">
              Stop juggling ChatGPT, Google Docs, Canva, Notion, Drive, and Zapier.
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              Switch to Oltrid AI - one place, one memory, one workflow, where everything you need works together seamlessly.
            </p>
            <a
              href="https://app.oltrid.com/auth"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Make the switch
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="relative">
            <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div className="min-w-0">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">Before</p>
                <ul className="flex flex-col gap-2">
                  {oldStack.map((t, i) => {
                    const isActive = i === active && !collapsed;
                    const isPast = i <= active || collapsed;
                    return (
                      <li
                        key={t.name}
                        className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-500 will-change-transform ${
                          isActive
                            ? "border-lime bg-card translate-x-2 shadow-[0_12px_30px_-20px_oklch(0.9_0.24_130)]"
                            : isPast
                              ? "border-border bg-surface opacity-70"
                              : "border-border/60 bg-surface/60 opacity-40"
                        }`}
                        style={{
                          transform: collapsed ? "translateX(10px) scale(0.98)" : "translateX(0)",
                        }}
                      >
                        {t.name}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex items-center justify-center text-muted-foreground">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full glass">
                  <ArrowRight className="h-5 w-5 hidden md:block" />
                  <ArrowDown className="h-5 w-5 md:hidden" />
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">After</p>
                <div
                  className="rounded-3xl glass-tint p-6 sm:p-8 text-center transition-all duration-700"
                  style={{
                    transform: collapsed ? "scale(1.03)" : "scale(1)",
                    boxShadow: collapsed
                      ? "0 30px 70px -30px oklch(0.9 0.24 130)"
                      : "0 10px 40px -30px oklch(0.9 0.24 130)",
                  }}
                >
                  <img src={logo.url} alt="Oltrid AI" className="h-8 w-auto mx-auto" />
                  <p className="mt-4 font-display font-bold text-lg sm:text-xl text-primary leading-snug">
                    One place. One memory. One workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


const leftNodes = ["Documents", "Mind Maps", "Presentations", "Sheets", "AI Agents"];
const rightNodes = ["To Do List", "Reminders", "Dashboards", "Automations"];

type Conn = { d: string; sx: number; sy: number; ex: number; ey: number };

function buildPath(sx: number, sy: number, ex: number, ey: number, fromLeft: boolean): Conn {
  const dx = Math.abs(ex - sx) * 0.52;
  const c1x = fromLeft ? sx + dx : sx - dx;
  const c2x = fromLeft ? ex - dx : ex + dx;
  const d = `M ${sx} ${sy} C ${c1x} ${sy}, ${c2x} ${ey}, ${ex} ${ey}`;
  return { d, sx, sy, ex, ey };
}

function Juggle() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const leftRefs = useRef<(HTMLLIElement | null)[]>([]);
  const rightRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [conns, setConns] = useState<{ left: Conn[]; right: Conn[] }>({ left: [], right: [] });

  const measure = () => {
    const container = containerRef.current;
    const center = centerRef.current;
    if (!container || !center) return;
    const cRect = container.getBoundingClientRect();
    const ceRect = center.getBoundingClientRect();
    const cardTop = ceRect.top - cRect.top;
    const cardH = ceRect.height;
    const cardLeft = ceRect.left - cRect.left;
    const cardRight = ceRect.right - cRect.left;

    const validLeft = leftRefs.current.filter(Boolean);
    const left: Conn[] = [];
    validLeft.forEach((li, i) => {
      if (!li) return;
      const r = li.getBoundingClientRect();
      const sx = r.right - cRect.left;
      const sy = r.top + r.height / 2 - cRect.top;
      // evenly distribute connection points along card's left edge
      const ey = cardTop + ((i + 1) / (validLeft.length + 1)) * cardH;
      left.push(buildPath(sx, sy, cardLeft, ey, true));
    });

    const validRight = rightRefs.current.filter(Boolean);
    const right: Conn[] = [];
    validRight.forEach((li, i) => {
      if (!li) return;
      const r = li.getBoundingClientRect();
      const sx = r.left - cRect.left;
      const sy = r.top + r.height / 2 - cRect.top;
      const ey = cardTop + ((i + 1) / (validRight.length + 1)) * cardH;
      right.push(buildPath(sx, sy, cardRight, ey, false));
    });

    setConns({ left, right });
  };

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 300);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const allConns = [...conns.left, ...conns.right];
  const dotColor = "oklch(0.75 0.22 130)";

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <Reveal>
        <div
          ref={containerRef}
          className="relative rounded-3xl glass py-10 px-4 sm:py-12 sm:px-6 md:py-16 md:px-14 overflow-hidden"
        >
          {/* SVG: connection lines + endpoint dots - desktop only */}
          <svg
            aria-hidden
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            style={{ zIndex: 0 }}
          >
            {conns.left.map((c, i) => (
              <g key={`l-${i}`}>
                <path d={c.d} fill="none" stroke={dotColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                <circle cx={c.sx} cy={c.sy} r="4" fill={dotColor} />
                <circle cx={c.ex} cy={c.ey} r="4" fill={dotColor} />
              </g>
            ))}
            {conns.right.map((c, i) => (
              <g key={`r-${i}`}>
                <path d={c.d} fill="none" stroke={dotColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                <circle cx={c.sx} cy={c.sy} r="4" fill={dotColor} />
                <circle cx={c.ex} cy={c.ey} r="4" fill={dotColor} />
              </g>
            ))}
          </svg>

          {/* Traveling light - desktop only */}
          <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 1 }}>
            {allConns.map((c, i) => (
              <span
                key={`dot-${i}`}
                className="juggle-dot"
                style={{ offsetPath: `path('${c.d}')`, animationDelay: `${i * 0.65}s` } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Desktop layout: 3-col mind map */}
          <div
            className="relative hidden md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-10"
            style={{ zIndex: 2 }}
          >
            <ul className="flex flex-col gap-5 items-start">
              {leftNodes.map((n, i) => (
                <li
                  key={`${n}-${i}`}
                  ref={(el) => { leftRefs.current[i] = el; }}
                  className="rounded-xl glass px-4 py-2 text-sm font-mono whitespace-nowrap select-none"
                >
                  {n}
                </li>
              ))}
            </ul>

            <div className="relative flex items-center justify-center">
              <div
                aria-hidden
                className="absolute inset-[-24px] rounded-3xl bg-lime/45 blur-3xl"
                style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
              />
              <div
                ref={centerRef}
                className="relative rounded-2xl glass-tint px-12 py-14 text-center min-w-[300px]"
              >
                <h3 className="font-display font-bold text-4xl leading-tight">No Need to Juggle</h3>
                <p className="mt-3 text-sm font-mono text-primary/75">
                  Control full suite with single chat window
                </p>
              </div>
            </div>

            <ul className="flex flex-col gap-5 items-end">
              {rightNodes.map((n, i) => (
                <li
                  key={`${n}-${i}`}
                  ref={(el) => { rightRefs.current[i] = el; }}
                  className="rounded-xl glass px-4 py-2 text-sm font-mono whitespace-nowrap select-none"
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile layout: center card on top, pills as chip cloud below */}
          <div className="md:hidden relative flex flex-col items-center gap-8" style={{ zIndex: 2 }}>
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-[-18px] rounded-3xl bg-lime/45 blur-2xl"
                style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
              />
              <div className="relative rounded-2xl glass-tint px-8 py-8 text-center">
                <h3 className="font-display font-bold text-2xl leading-tight">No Need to Juggle</h3>
                <p className="mt-2 text-xs font-mono text-primary/75">
                  Control full suite with single chat window
                </p>
              </div>
            </div>
            <ul className="flex flex-wrap justify-center gap-2">
              {[...leftNodes, ...rightNodes].map((n, i) => (
                <li
                  key={`${n}-${i}`}

                  className="rounded-xl glass px-3.5 py-1.5 text-xs font-mono whitespace-nowrap select-none"
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

type T = { title: string; quote: string; name: string; role: string; avatar: string };
const testimonials: T[] = [
  { title: "IT REMEMBERS MY WHOLE PROJECT", quote: "Came back after a week and it still knew every decision we made. I stopped re-explaining context entirely.", name: "Mark V.", role: "Beta user · Discord", avatar: avatar1 },
  { title: "REPLACED FOUR TABS", quote: "Docs, deck and the workflow all came out of one chat. My old stack is basically sitting unused now.", name: "Elena R.", role: "Beta user · X/Twitter", avatar: avatar2 },
  { title: "IDEA TO DECK IN ONE GO", quote: "I described the launch on Monday and asked for the presentation on Friday. It just built it from memory.", name: "David L.", role: "Early access · Product feedback", avatar: avatar3 },
];


function Testimonials() {
  const [idx, setIdx] = useState(1);
  const total = testimonials.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:gap-6 mb-8 md:mb-10">
        <Reveal>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight">
            What Early Users Say
          </h2>
        </Reveal>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button onClick={prev} className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition" aria-label="Previous">
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <button onClick={next} className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition" aria-label="Next">
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      </div>

      {/* Mobile: single-card carousel */}
      <div className="md:hidden">
        <article className="rounded-3xl p-6 min-h-[340px] flex flex-col justify-between glass-tint">
          <h3 className="font-display font-bold text-xl tracking-tight text-primary max-w-[16ch]">
            {testimonials[idx].title}
          </h3>
          <p className="text-sm text-primary/90 mt-6">"{testimonials[idx].quote}"</p>
          <div className="mt-6 flex items-center gap-3">
            <img src={testimonials[idx].avatar} alt={testimonials[idx].name} loading="lazy" className="h-11 w-11 rounded-full object-cover ring-2 ring-background" />
            <div>
              <div className="text-sm font-semibold text-primary">{testimonials[idx].name}</div>
              <div className="text-xs text-primary/70">{testimonials[idx].role}</div>
            </div>
          </div>
        </article>
        <div className="mt-4 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-primary" : "w-2 bg-primary/30"}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: 3-up */}
      <div className="hidden md:grid md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => {
          const active = i === idx;
          return (
            <Reveal key={t.name} delay={i * 100}>
              <article
                className={`rounded-3xl p-6 md:p-8 h-full min-h-[380px] flex flex-col justify-between transition-all duration-500 ${
                  active ? "bg-lime scale-[1.02] shadow-xl" : "bg-muted-foreground/40"
                }`}
              >
                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-primary max-w-[14ch]">
                  {t.title}
                </h3>
                <p className="text-sm md:text-base text-primary/90 mt-8">"{t.quote}"</p>
                <div className="mt-8 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} loading="lazy" className="h-12 w-12 rounded-full object-cover ring-2 ring-background" />
                  <div>
                    <div className="text-sm font-semibold text-primary">{t.name}</div>
                    <div className="text-xs text-primary/70">{t.role}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function NewsletterForm() {
  const subscribe = useServerFn(subscribeEmail);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const submitted = email;
    const loadingId = toast.loading("Adding you to the list…");
    try {
      await subscribe({ data: { email: submitted } });
      setStatus("ok");
      setMessage(`✓ ${submitted} added to the list.`);
      setEmail("");
      toast.success("You're subscribed!", {
        id: loadingId,
        description: `${submitted} was saved to our list.`,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setStatus("error");
      setMessage(msg);
      toast.error("Subscription failed", { id: loadingId, description: msg });
    }
  };

  const loading = status === "loading";

  return (
    <form onSubmit={onSubmit} className="mt-8" aria-busy={loading}>
      <label htmlFor="newsletter-email" className="text-xs text-primary/80">Email</label>
      <input
        id="newsletter-email"
        type="email"
        required
        maxLength={255}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        disabled={loading}
        className="mt-1 w-full bg-transparent border-b border-primary/60 focus:border-primary outline-none py-2 text-sm placeholder:text-primary/40 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
      >
        {loading && (
          <span
            aria-hidden
            className="h-3.5 w-3.5 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin"
          />
        )}
        {loading ? "Saving…" : "Stay updated"}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`mt-3 text-xs min-h-4 ${
          status === "ok" ? "text-primary" : status === "error" ? "text-destructive" : "text-primary/60"
        }`}
      >
        {message}
      </p>
    </form>
  );
}

const footerGroups: { heading: string; links: { label: string; to: string; hash?: boolean }[] }[] = [
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Cookie Policy", to: "/cookies" },
    ],
  },
  {
    heading: "Contact",
    links: [{ label: "Contact", to: "/contact" }],
  },
];


function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-3xl glass glass-highlight p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="flex items-center gap-2">
              <img src={logo.url} alt="Oltrid AI" className="h-7 w-auto" />
            </div>
            <p className="mt-4 text-sm">Your AI workspace for everything.</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 text-sm">
            {footerGroups.map((g) => (
              <div key={g.heading}>
                <h4 className="font-display font-bold text-xs tracking-wide uppercase text-muted-foreground">
                  {g.heading}
                </h4>
                <ul className="mt-3 space-y-2">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      {l.hash ? (
                        <a href={l.to} className="hover:text-lime transition">{l.label}</a>
                      ) : (
                        <Link to={l.to} className="hover:text-lime transition">{l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">© 2026 Oltrid AI. Future of AI Powered Productivity.</p>
        </div>

        <div id="signup" className="rounded-3xl glass-tint p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[320px]">
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl">STAY UPDATED</h3>
            <p className="mt-2 text-sm text-primary/80">Subscribe for event updates & exclusive content.</p>
            <NewsletterForm />
          </div>
          <div className="mt-8">
            <h4 className="font-display font-bold text-sm tracking-wide">FOLLOW US</h4>
            <div className="mt-3 flex items-center gap-3 text-primary">
              <a href="https://www.linkedin.com/company/oltrid/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-70 transition"><Linkedin className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/oltridai" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70 transition"><Instagram className="h-5 w-5" /></a>
              <a href="https://youtube.com/@oltrid" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-70 transition"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="relative min-h-screen text-foreground">
      <div className="liquid-bg">
        <div className="liquid-blob h-[38rem] w-[38rem] -top-40 -left-32 bg-[oklch(0.92_0.11_190/0.55)]" />
        <div className="liquid-blob h-[30rem] w-[30rem] top-1/3 -right-32 bg-[oklch(0.93_0.16_130/0.45)]" style={{ animationDelay: "-7s" }} />
        <div className="liquid-blob h-[34rem] w-[34rem] bottom-0 left-1/3 bg-[oklch(0.9_0.08_260/0.45)]" style={{ animationDelay: "-14s" }} />
      </div>
      <Nav />
      <main>
        <Hero />
        <Why />
        <Suite />
        <Memory />
        <Juggle />
        <BeforeAfter />
        <Testimonials />

      </main>
      <Footer />
    </div>
  );
}
