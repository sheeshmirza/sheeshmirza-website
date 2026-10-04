import { Star } from "lucide-react";
import { books } from "@/data/books";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

export function Books() {
  return (
    <Section className="border-t border-border">
      <Reveal>
        <SectionHeading eyebrow="Reading" title="What I'm Reading" />
      </Reveal>

      {books.length === 0 ? (
        <p className="mt-10 text-muted">
          Book notes on psychology, business, startups, technology and AI will
          appear here as I read.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <Card key={book.title} interactive className="p-6">
              <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                {book.topic}
              </span>
              <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">{book.title}</h3>
              <p className="mt-1 text-sm text-muted">{book.author}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{book.takeaway}</p>
              <div
                className="mt-4 flex items-center gap-1"
                aria-label={`Rating: ${book.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    aria-hidden="true"
                    className={i < book.rating ? "fill-accent text-accent" : "text-border"}
                  />
                ))}
                <span className="sr-only">{book.rating} of 5 stars</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
