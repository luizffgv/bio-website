/**
 * The properties of a {@link Button} component.
 */
export type ButtonProperties = {
  /** The content of the button. */
  children: React.ReactNode;

  // Style variant properties
  /** Whether the button should be styled as a weak button. */
  weak?: boolean | undefined;
  /** Whether the button should be styled as a danger button. */
  danger?: boolean | undefined;

  // Action variant properties
  /** The callback function to be executed when the button is clicked. */
  onClick?: (() => void) | undefined;
  /** The URL to navigate to when the button is clicked. */
  href?: string | undefined;
  /**
   * The target of the link. If not specified, the link will open in the
   * same tab.
   */
  target?: string | undefined;
} & ( // Button color variants
  | object
  | {
      // Primary button variant
      weak?: false | undefined;
      danger?: false | undefined;
    }
  | {
      // Weak button variant
      weak: true;
      danger?: false | undefined;
    }
  | {
      // Danger button variant
      weak?: false | undefined;
      danger: true;
    }
) &
  // Button action variants
  (| {
        // Action button variant
        onClick: () => void;
        href?: undefined;
        target?: undefined;
      }
    | {
        // Anchor button variant

        onClick?: undefined;
        href: string;
        target?: string | undefined;
      }
  );

/**
 * Renders a button component.
 *
 * @param properties - The properties for the button component.
 * @returns The rendered button component.
 */
export default function Button(properties: ButtonProperties) {
  const className = `block hover:brightness-110 text-white font-bold py-2 px-4 rounded transition cursor-pointer ${properties.danger ? "bg-red-500" : properties.weak ? "bg-stone-500" : "bg-blue-500"}`;

  return properties.onClick ? (
    <button type="button" onClick={properties.onClick} className={className}>
      {properties.children}
    </button>
  ) : (
    <a href={properties.href} target={properties.target} className={className}>
      {properties.children}
    </a>
  );
}
