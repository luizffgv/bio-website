import { useContext } from "react";
import { CreateContext, EditingSectionContext } from "../contexts/create";
import Button from "./button";
import Card from "./card";
import { Section } from "../lib/section";

/**
 * Properties for the {@link EditableSectionPreview} component.
 */
export interface EditableSectionPreviewProperties {
  /** Section to preview. */
  section: Section;
}

/**
 * Component for rendering an editable preview of a section.
 *
 * Requires {@link CreateContext} and {@link EditingSectionContext} to be
 * provided.
 */
export default function EditableSectionPreview({
  section,
}: EditableSectionPreviewProperties) {
  const { removeSection } = useContext(CreateContext);
  const { setSection } = useContext(EditingSectionContext);

  return (
    <Card raised>
      <div className="flex flex-col items-center gap-2">
        <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          {section.title}
        </h3>
        <div className="flex flex-row flex-wrap justify-center gap-2">
          <Button onClick={() => setSection(section)}>Editar</Button>
          <Button onClick={() => removeSection?.(section)} danger>
            Remover
          </Button>
        </div>
      </div>
    </Card>
  );
}
