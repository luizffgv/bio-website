import { useEffect, useRef } from "react";

/** The properties of the {@link TextArea} component. */
export interface TextAreaProperties {
  /** The default value of the input. */
  defaultValue?: string | undefined;
  /** The value of the input. */
  value?: string | undefined;
  /** Ref that stores the value of the input. */
  valueRef?: React.MutableRefObject<string | null> | undefined;
  /** The number of rows in the textarea. */
  rows?: number | undefined;
  /** The callback to be called when the input value changes. */
  onChange?: (value: string) => void;
}

/** Renders a textarea component. */
export default function TextArea(properties: TextAreaProperties) {
  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (properties.valueRef)
      properties.valueRef.current = textarea.current!.value;
  }, [properties.valueRef]);

  return (
    <textarea
      ref={textarea}
      rows={properties.rows}
      defaultValue={properties.defaultValue}
      value={properties.value}
      onChange={() => {
        if (properties.valueRef)
          properties.valueRef.current = textarea.current!.value;

        properties.onChange?.(textarea.current!.value);
      }}
      className="resize-none rounded border-2 border-transparent bg-stone-600 px-2 py-1 outline-none transition-colors focus:border-blue-500"
    ></textarea>
  );
}
