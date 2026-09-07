import { socialLinks, site } from "@/data/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-lg font-semibold">{site.name}</p>
          <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted">
            A public notebook on building useful things, studying behavior, and
            making complicated ideas easier to use.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-6 text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
