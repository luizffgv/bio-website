import { createContext } from "react";
import { Section } from "../lib/section";

/**
 * The context for creating a page.
 */
export interface CreateContext {
  /**
   * Sets {@link imageUrl}.
   */
  setImageUrl: (url: string) => void;
  /**
   * The profile image URL of the creator of the page.
   */
  readonly imageUrl?: string | undefined;
  /**
   * Sets {@link name}.
   */
  setName: (name: string) => void;
  /**
   * The sections of the creator of the page.
   */
  readonly sections?: Readonly<Section>[] | undefined;
  /**
   * Replaces a section.
   *
   * @param old - The section to replace.
   * @param new - The new section to replace it with.
   */
  replaceSection: (old: Section, new_: Section) => void;
  /**
   * Removes a section.
   *
   * @param section - The section to remove.
   */
  removeSection: (section: Section) => void;
  /**
   * Adds a new blank section.
   */
  addNewSection: () => void;
  /**
   * The name of the creator of the page.
   */
  readonly name?: string | undefined;
}

/**
 * The context for creating a page.
 */
export const CreateContext = createContext<CreateContext>({
  setImageUrl: () => {
    throw new Error("Unimplemented");
  },
  setName: () => {
    throw new Error("Unimplemented");
  },
  replaceSection: () => {
    throw new Error("Unimplemented");
  },
  removeSection: () => {
    throw new Error("Unimplemented");
  },
  addNewSection: () => {
    throw new Error("Unimplemented");
  },
});

/**
 * The context for the section that is being edited.
 */
export interface EditingSectionContext {
  /**
   * The section that is being edited.
   */
  readonly section?: Readonly<Section> | undefined;
  /**
   * Sets {@link section}.
   *
   * @param section - Section to set.
   */
  setSection: (section: Section) => void;
}

export const EditingSectionContext = createContext<EditingSectionContext>({
  setSection: () => {
    throw new Error("Unimplemented");
  },
});
