import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Zap,
} from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

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
    { label: "About Us", href: "#about" },
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50">
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
            href="https://oltrid.com/auth"
            className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
          >
            Login / Signup
          </a>
        </div>
        <button
          className="md:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-up">
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
              href="https://oltrid.com/auth"
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
  "How can I help you today?",
  "Summarize my last meeting notes...",
  "Draft a follow-up email to the client...",
  "Generate a project roadmap for Q3...",
  "Build a dashboard from this spreadsheet...",
  "Turn these bullets into a presentation...",
  "What's on my agenda this week?",
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
    window.location.href = "https://oltrid.com/auth";
  };
  return (
    <form onSubmit={submit} className="relative mx-auto w-full max-w-2xl">
      <div className="chat-border-glow">
        <div className="relative rounded-[calc(1.5rem-1.5px)] bg-card shadow-sm px-4 py-3">
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
              <button type="button" onClick={submit} className="p-1.5 rounded-full hover:bg-muted transition" aria-label="Attach">
                <Plus className="h-4 w-4" />
              </button>
              <button type="button" onClick={submit} className="p-1.5 rounded-full hover:bg-muted transition" aria-label="Emoji">
                <Smile className="h-4 w-4" />
              </button>
              <button type="button" onClick={submit} className="p-1.5 rounded-full hover:bg-muted transition" aria-label="Image">
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
          <span className="inline-flex items-center gap-2 rounded-full bg-lime/90 text-primary px-4 py-1.5 text-xs font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Alpha is live now
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-6 font-display font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground max-w-4xl mx-auto">
            The Future of AI-Powered{" "}
            <span className="relative inline-block">
              <span className="relative z-10 px-2">Productivity</span>
              <span
                aria-hidden
                className="absolute inset-0 -skew-y-1 bg-lime rounded-md"
                style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
              />
            </span>{" "}
            is Here.
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 text-sm md:text-base font-mono text-muted-foreground">
            Seamlessly automate your workflows with Oltrid AI.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-10">
            <ChatInput />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const whyItems = [
  { n: "01", title: "CUTTING-EDGE INSIGHTS", desc: "Gain firsthand knowledge from top AI experts and pioneers shaping the industry." },
  { n: "02", title: "HANDS-ON LEARNING", desc: "Participate in interactive workshops, live demos, and deep-dive sessions to sharpen your skills." },
  { n: "03", title: "EXCLUSIVE NETWORKING", desc: "Connect with AI leaders, investors, startups, and fellow professionals at curated networking events." },
  { n: "04", title: "INNOVATION SHOWCASE", desc: "Explore groundbreaking AI solutions, from emerging startups to tech giants redefining the future." },
];

function Why() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <div className="rounded-[2rem] md:rounded-[2.5rem] bg-surface p-6 sm:p-10 md:p-14">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <Reveal>
            <h2 className="md:col-span-2 font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none">
              WHY OLTRID?
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-sm text-muted-foreground max-w-xs md:mt-4">
              Discover why Next-Gen AI Summit is the must-attend event for AI professionals, innovators, and industry leaders.
            </p>
          </Reveal>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {whyItems.map((it, i) => (
            <Reveal key={it.n} delay={i * 100}>
              <div className="group relative overflow-hidden rounded-2xl bg-card p-6 sm:p-8 h-56 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold tracking-wide text-sm sm:text-base">{it.title}</h3>
                </div>
                <p className="mt-4 text-sm text-muted-foreground max-w-[16rem]">{it.desc}</p>
                <span className="pointer-events-none absolute -bottom-6 -right-2 font-display font-bold text-[9rem] leading-none text-muted-foreground/15 select-none group-hover:text-lime/40 transition-colors">
                  {it.n}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Suite() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <div className="grid md:grid-cols-2 gap-5">
        <Reveal>
          <div className="rounded-3xl bg-surface ring-2 ring-lime p-8 md:p-10 h-full min-h-[420px] flex flex-col">
            <h3 className="font-display font-bold text-3xl md:text-4xl">Ai Powered Suite</h3>
            <div className="mt-8 flex items-start gap-6">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-card">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <p className="text-sm text-muted-foreground max-w-xs">
                Hear from global AI leaders, researchers, and entrepreneurs who are defining the future of artificial intelligence.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="flex flex-col gap-5">
          <Reveal delay={100}>
            <div className="rounded-3xl bg-lime p-8 md:p-10">
              <h3 className="font-display font-bold text-2xl md:text-3xl">Memory Centric Actions</h3>
              <p className="mt-4 text-sm text-primary/80 max-w-md">
                Explore advanced machine learning, natural language processing, AI-driven automation, and emerging cybersecurity applications.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
              <h3 className="font-display font-bold text-2xl md:text-3xl">Perfect Personal Assistant</h3>
              <p className="mt-4 text-sm text-muted-foreground max-w-md">
                Enjoy exclusive networking sessions, roundtables, and social events to foster collaboration and spark new partnerships.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const leftNodes = ["Documents", "Mind Maps", "Presentations", "Sheets", "AI Agents"];
const rightNodes = ["To Do List", "Reminders", "Dashboards", "AI Agents"];

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
          className="relative rounded-3xl bg-surface border border-border py-12 px-6 md:py-16 md:px-14 overflow-hidden"
        >
          {/* SVG: connection lines + endpoint dots, sits behind all content */}
          <svg
            aria-hidden
            className="absolute inset-0 w-full h-full pointer-events-none"
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

          {/* Traveling light: each dot travels from pill → center card */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            {allConns.map((c, i) => (
              <span
                key={`dot-${i}`}
                className="juggle-dot"
                style={{ offsetPath: `path('${c.d}')`, animationDelay: `${i * 0.65}s` } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Grid layout — untouched positions */}
          <div
            className="relative grid grid-cols-3 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-10"
            style={{ zIndex: 2 }}
          >
            {/* Left pills */}
            <ul className="flex flex-col gap-4 md:gap-5 items-start">
              {leftNodes.map((n, i) => (
                <li
                  key={n}
                  ref={(el) => { leftRefs.current[i] = el; }}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs md:text-sm font-mono whitespace-nowrap select-none"
                >
                  {n}
                </li>
              ))}
            </ul>

            {/* Center card */}
            <div className="relative flex items-center justify-center">
              <div
                aria-hidden
                className="absolute inset-[-24px] rounded-3xl bg-lime/45 blur-3xl"
                style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
              />
              <div
                ref={centerRef}
                className="relative rounded-2xl bg-lime px-8 py-10 md:px-12 md:py-14 text-center shadow-lg min-w-[200px] md:min-w-[300px]"
              >
                <h3 className="font-display font-bold text-2xl md:text-4xl leading-tight">No Need to Juggle</h3>
                <p className="mt-3 text-xs md:text-sm font-mono text-primary/75">
                  Control full suite with single chat window
                </p>
              </div>
            </div>

            {/* Right pills */}
            <ul className="flex flex-col gap-4 md:gap-5 items-end">
              {rightNodes.map((n, i) => (
                <li
                  key={n}
                  ref={(el) => { rightRefs.current[i] = el; }}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs md:text-sm font-mono whitespace-nowrap select-none"
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
  { title: "GAME-CHANGING INSIGHTS", quote: "This summit opened my eyes to the future of AI and how it will shape industries.", name: "Mark Vandenberg", role: "CTO, NeuralTech", avatar: avatar1 },
  { title: "THE BEST AI EVENT!", quote: "Incredible speakers, top-tier networking, and cutting-edge discussions all in one place.", name: "Elena Rojas", role: "AI Researcher, DeepMind", avatar: avatar2 },
  { title: "UNMATCHED OPPORTUNITIES", quote: "From hands-on workshops to visionary talks, this summit is a must-attend for AI professionals.", name: "David Laurent", role: "CEO, FutureAI Labs", avatar: avatar3 },
];

function Testimonials() {
  const [idx, setIdx] = useState(1);
  const total = testimonials.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
      <div className="flex items-start justify-between gap-6 mb-10">
        <Reveal>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
            What Past Attendees Say
          </h2>
        </Reveal>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={prev} className="h-12 w-12 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition" aria-label="Previous">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={next} className="h-12 w-12 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition" aria-label="Next">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
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
      <div className="md:hidden flex items-center justify-center gap-3 mt-6">
        <button onClick={prev} className="h-11 w-11 rounded-full border border-primary flex items-center justify-center" aria-label="Previous">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={next} className="h-11 w-11 rounded-full border border-primary flex items-center justify-center" aria-label="Next">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-3xl bg-surface p-8 md:p-10 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="flex items-center gap-2">
              <img src={logo.url} alt="Oltrid AI" className="h-7 w-auto" />
            </div>
            <p className="mt-4 text-sm">Your AI workspace for everything.</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-y-2 text-sm">
            <a href="#" className="hover:text-lime transition">Agenda</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">Terms & Conditions</a>
            <a href="#" className="hover:text-lime transition">Speakers</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">Privacy Policy</a>
            <a href="#" className="hover:text-lime transition">Register</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">Cookie Policy</a>
            <a href="#" className="hover:text-lime transition">Venue</a>
            <span />
            <a href="#" className="hover:text-lime transition">FAQ</a>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">© 2026 Oltrid AI. Future of AI Powered Productivity.</p>
        </div>
        <div id="signup" className="rounded-3xl bg-lime p-8 md:p-10 flex flex-col justify-between min-h-[320px]">
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl">STAY UPDATED</h3>
            <p className="mt-2 text-sm text-primary/80">Subscribe for event updates & exclusive content.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-8">
              <label className="text-xs text-primary/80">Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="mt-1 w-full bg-transparent border-b border-primary/60 focus:border-primary outline-none py-2 text-sm placeholder:text-primary/40"
              />
              <button
                type="submit"
                className="mt-6 inline-flex items-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition"
              >
                Stay updated
              </button>
            </form>
          </div>
          <div className="mt-8">
            <h4 className="font-display font-bold text-sm tracking-wide">FOLLOW US</h4>
            <div className="mt-3 flex items-center gap-3 text-primary">
              <a href="#" aria-label="Facebook" className="hover:opacity-70 transition"><Facebook className="h-5 w-5" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:opacity-70 transition"><Linkedin className="h-5 w-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:opacity-70 transition"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="YouTube" className="hover:opacity-70 transition"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Why />
        <Suite />
        <Juggle />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
