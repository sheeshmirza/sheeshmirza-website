"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { navLinks, topicLinks } from "@/data/site-config";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [mobileTopicsOpen, setMobileTopicsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setTopicsOpen(false);
  }, [pathname]);

  // Click outside to close desktop topics dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTopicsOpen(false);
      }
    };
    if (topicsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [topicsOpen]);

  // Handle Escape key to close navigation menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (topicsOpen) setTopicsOpen(false);
        if (open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, topicsOpen]);

  const regularLinks = navLinks.filter((l) => l.label !== "Topics");
  const isTopicActive = topicLinks.some((t) => t.href === pathname);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <Link
          href="/"
          className="group flex items-center gap-3 font-serif text-lg font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center bg-foreground text-sm text-background transition-transform group-hover:rotate-6"
          >
            S
          </span>
          <span>Sheesh Mirza</span>
        </Link>

        <nav aria-label="Main Navigation" className="hidden items-center gap-7 md:flex">
          {regularLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-signal ${
                pathname === link.href ? "font-medium text-foreground" : "text-muted"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}

          {/* Topics Accessible Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setTopicsOpen((v) => !v)}
              aria-expanded={topicsOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 text-sm transition-colors hover:text-signal ${
                isTopicActive ? "font-medium text-foreground" : "text-muted"
              }`}
            >
              <span>Topics</span>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform duration-200 ${topicsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {topicsOpen && (
              <div
                role="menu"
                className="absolute left-1/2 top-full mt-3 w-80 -translate-x-1/2 border border-border bg-surface p-3 shadow-xl animate-in fade-in slide-in-from-top-1"
              >
                <div className="grid grid-cols-1 gap-1">
                  {topicLinks.map((topic) => (
                    <Link
                      key={topic.href}
                      role="menuitem"
                      href={topic.href}
                      onClick={() => setTopicsOpen(false)}
                      className={`group block p-2.5 transition-colors hover:bg-background ${
                        pathname === topic.href ? "bg-background" : ""
                      }`}
                    >
                      <p className="text-xs font-semibold text-foreground group-hover:text-signal">
                        {topic.label}
                      </p>
                      <p className="mt-0.5 text-[0.72rem] text-muted line-clamp-1">
                        {topic.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
        </div>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:border-signal md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <nav
          ref={menuRef}
          id="mobile-navigation"
          aria-label="Mobile Navigation"
          className="border-t border-border bg-background px-6 pb-6 md:hidden shadow-lg animate-in fade-in"
        >
          <div className="flex flex-col gap-4 pt-4">
            {regularLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm transition-colors hover:text-signal ${
                  pathname === link.href ? "font-medium text-foreground" : "text-muted"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Topics Accordion */}
            <div className="border-t border-border/50 pt-2">
              <button
                type="button"
                onClick={() => setMobileTopicsOpen((v) => !v)}
                className="flex w-full items-center justify-between py-1 text-sm font-medium text-foreground"
              >
                <span>Topics & Hubs</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileTopicsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileTopicsOpen && (
                <div className="mt-2 space-y-2 pl-3">
                  {topicLinks.map((topic) => (
                    <Link
                      key={topic.href}
                      href={topic.href}
                      onClick={() => setOpen(false)}
                      className={`block py-1 text-xs text-muted hover:text-signal ${
                        pathname === topic.href ? "font-semibold text-foreground" : ""
                      }`}
                    >
                      {topic.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-border">
              <span className="text-xs text-muted">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
