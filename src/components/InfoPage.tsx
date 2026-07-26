import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logo from "@/assets/logo.png.asset.json";

export function InfoPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo.url} alt="Oltrid AI" className="h-7 w-auto" />
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 text-base md:text-lg text-muted-foreground">{intro}</p>
        )}
        <div className="mt-10 prose prose-neutral max-w-none text-foreground/90 leading-relaxed space-y-6 text-[15px]">
          {children}
        </div>
      </main>
      <footer className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 text-xs text-muted-foreground">
        © 2026 Oltrid AI. Future of AI Powered Productivity.
      </footer>
    </div>
  );
}
