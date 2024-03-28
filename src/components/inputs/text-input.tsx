import { HTMLInputTypeAttribute, useEffect, useRef } from "react";

/** Properties for the {@link TextInput} component. */
export interface TextInputProperties {
  /** The name of the input. */
  name?: string | undefined;
  /** The value of the input. */
  value?: string | undefined;
  /** The default value of the input. */
  defaultValue?: string | undefined;
  /** Ref to store the value of the input. */
  valueRef?: React.MutableRefObject<string | null> | undefined;
  /** The type of the input. Defaults to `text`. */
  type?: HTMLInputTypeAttribute | undefined;
  /** The pattern of the input. */
  pattern?: string | undefined;
  /** The placeholder of the input. */
  placeholder?: string | undefined;
  /** Whether the input is disabled. */
  disabled?: boolean | undefined;
  /** The function that is called when the input value changes. */
  onChange?: ((value: string) => void) | undefined;
}

/** Renders a text input component. */
export default function TextInput(properties: TextInputProperties) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (properties.valueRef) properties.valueRef.current = input.current!.value;
  }, [properties.valueRef, properties.value]);

  useEffect(() => {
    if (properties.value != undefined) properties.onChange?.(properties.value);
    // We don't care about calling onChange as a side effect of onChange being
    // updated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties.value]);

  return (
    <input
      ref={input}
      name={properties.name}
      value={properties.value}
      type={properties.type ?? "text"}
      defaultValue={properties.defaultValue}
      placeholder={properties.placeholder}
      pattern={properties.pattern}
      disabled={properties.disabled}
      onChange={(event) => {
        if (properties.valueRef)
          properties.valueRef.current = event.target.value;
        properties.onChange?.(event.target.value);
      }}
      className="max-w-full rounded border-2 border-transparent bg-stone-600 px-2 py-1 outline-none transition-colors invalid:text-red-500 focus:border-blue-500"
    ></input>
  );
}
