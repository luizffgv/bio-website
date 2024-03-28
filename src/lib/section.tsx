/** A Link that links to another page. */
export type Link = {
  /** A unique identifier for the button. */
  id: number;
  /** The text of the button. */
  text: string;
  /** The target URL of the button. */
  href: string;
};

/** A section about the creator of a page. */
export type Section = {
  /** A unique identifier for the section. */
  id: number;
  /** Title of the section. */
  title: string;
  /** The type of the section. */
  type: "links" | "text";
} & (
  | {
      type: "links";
      /** List of links in the section. */
      content: Link[];
    }
  | {
      type: "text";
      /** Text content for the section. */
      content: string;
    }
);
