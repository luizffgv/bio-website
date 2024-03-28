import { useEffect, useRef } from "react";
import Button from "./button";

/** The properties of the {@link Modal} component. */
export interface ModalProperties {
  children: React.ReactNode;
  /** A function to call when the user tries to close the modal. */
  onCloseRequest: () => void;
}

/** A modal dialog that shows up on the top level. */
export default function Modal({ children, onCloseRequest }: ModalProperties) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialog.current == undefined)
      throw new Error("Dialog element is not mounted");
    dialog.current.showModal();
  });

  return (
    <dialog
      ref={dialog}
      className="fixed inset-0 left-0 top-0 z-[1] m-0 flex h-screen max-h-screen w-screen max-w-[100vw] flex-col items-center gap-8 overflow-y-scroll bg-black/50 p-[2.5vmin] text-inherit backdrop-blur-sm [justify-content:_safe_center]"
      onCancel={(event) => {
        event.preventDefault();
        onCloseRequest();
      }}
    >
      <Button onClick={() => onCloseRequest()}>Fechar</Button>
      {children}
    </dialog>
  );
}
