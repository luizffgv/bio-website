/** The properties of the {@link Card} component. */
export interface CardProperties {
  /** Whether to add standard padding to the card. */
  padding?: boolean;
  /** For cards that are nested in other cards. */
  raised?: boolean;
  children: React.ReactNode;
}

/** A card component. */
export default function Card({
  padding = true,
  raised = false,
  children,
}: CardProperties) {
  return (
    <div className={`rounded-2xl ${raised ? "bg-stone-700" : "bg-stone-800"}`}>
      <div className={`rounded-2xl ${padding ? "p-4" : ""}`}>{children}</div>
    </div>
  );
}
