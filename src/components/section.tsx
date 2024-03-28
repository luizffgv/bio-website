import { Section as SectionType } from "../lib/section";
import Button from "./button";

/** Properties for the {@link Section} component. */
export interface SectionProperties {
  /** The section to render. */
  section: SectionType;
}

/** A section about the creator of a page. */
export default function Section({ section }: SectionProperties) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">{section.title}</h2>
      {section.type == "text" && (
        <pre className="whitespace-pre-wrap [font-family:_inherit]">
          {section.content}
        </pre>
      )}
      {section.type == "links" && (
        <ul className="flex flex-row flex-wrap gap-2">
          {section.content.map(({ id, text, href }) => (
            <Button key={id} href={href} target="_blank">
              {text}
            </Button>
          ))}
        </ul>
      )}
    </section>
  );
}
