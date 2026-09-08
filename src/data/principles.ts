export interface Principle {
  quote: string;
}

// Editable personal principles — not verified quotations from third parties.
export const principles: Principle[] = [
  { quote: "Build the smallest honest test before defending the biggest idea." },
  { quote: "Technology earns its keep when it removes human friction, not when it shows off." },
  { quote: "People don't buy specifications; they buy what grants them status, safety, or relief." },
  { quote: "The most scalable backend means nothing if the interface demands exhausting cognitive load." },
  { quote: "Execution is a feedback engine, not a trophy race to ship noise." },
  { quote: "Every feature is a liability. Only keep what actively protects a core user outcome." },
  { quote: "AI doesn't replace thinking; it penalizes sloppy thinking by multiplying mistakes at scale." },
  { quote: "Understand the customer's unstated emotional context, not just their functional ticket." },
  { quote: "Simplicity is not a beginning; it is the clarity left after all the hard trade-offs are settled." },
  { quote: "Constraints breed elegant engineering; unconstrained budgets breed bloated architecture." },
  { quote: "High-conviction bets require rapid invalidation loops, not endless theoretical debate." },
  { quote: "Trust compounds through predictable reliability and evaporates in a single dark pattern." },
  { quote: "Master memory layouts, protocols, and fundamental primitives before chasing abstractions." },
  { quote: "A single builder with automated leverage can outpace an entire organization paralyzed by process." },
];
