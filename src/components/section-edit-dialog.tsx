import { useContext, useEffect, useState } from "react";
import { EditingSectionContext } from "../contexts/create";
import { Section } from "../lib/section";
import Modal from "./modal";
import TextInput from "./inputs/text-input";
import Button from "./button";
import TextArea from "./inputs/textarea";
import Card from "./card";

/**
 * Component for editing the text content of the section in
 * {@link EditingSectionContext}.
 */
function TextEditSection() {
  const { section, setSection } = useContext(EditingSectionContext);

  if (section == undefined)
    throw new Error("Section is undefined in section text editor");

  if (section.type != "text")
    throw new Error(
      `Section has wrong type "${section.type}" in section text editor`,
    );

  return (
    <>
      <h2 className="text-center text-lg font-bold">Texto da seção</h2>
      <TextArea
        value={section.content}
        rows={8}
        onChange={(value) => setSection({ ...section, content: value })}
      ></TextArea>
    </>
  );
}

/** Properties for the {@link EditableLinkPreview} component. */
interface EditableLinkPreviewProperties {
  /** The index of the link in the section content array. */
  index: number;
}

/**
 * Component for editing the a link of the section in
 * {@link EditingSectionContext}, given the link's index in the section.
 */
function EditableLinkPreview({ index }: EditableLinkPreviewProperties) {
  const { section, setSection } = useContext(EditingSectionContext);

  if (section == undefined)
    throw new Error("Section is undefined in section button preview");

  if (section.type != "links")
    throw new Error(
      `Section has wrong type "${section.type}" in section button preview`,
    );

  const button = section.content[index];
  if (button == undefined)
    throw new Error(
      "Index provided in section button preview is out of bounds",
    );

  return (
    <div className="max-w-full">
      <Card raised>
        <div className="flex flex-col items-center gap-2">
          <TextInput
            defaultValue={button.text}
            placeholder="Nome exibido"
            onChange={(value) => {
              setSection({
                ...section,
                content: section.content.map((link, linkIndex) => {
                  if (linkIndex == index) {
                    return {
                      ...link,
                      text: value,
                    };
                  }
                  return link;
                }),
              });
            }}
          ></TextInput>
          <p className="font-bold">↓</p>
          <TextInput
            defaultValue={button.href}
            placeholder="URL de destino"
            type="url"
            onChange={(value) => {
              setSection({
                ...section,
                content: section.content.map((link, linkIndex) => {
                  if (linkIndex == index) {
                    return {
                      ...link,
                      href: value,
                    };
                  }
                  return link;
                }),
              });
            }}
          ></TextInput>
          <Button
            danger
            onClick={() =>
              setSection({
                ...section,
                content: section.content.filter(
                  (_, linkIndex) => linkIndex != index,
                ),
              })
            }
          >
            Deletar
          </Button>
        </div>
      </Card>
    </div>
  );
}

/**
 * Component for editing the links of the section in
 * {@link EditingSectionContext}.
 */
function LinksEditSection() {
  const { section, setSection } = useContext(EditingSectionContext);

  if (section == undefined)
    throw new Error("Section is undefined in section links editor");

  if (section.type != "links")
    throw new Error(
      `Section has wrong type "${section.type}" in section links editor`,
    );

  return (
    <>
      <h2 className="text-center text-lg font-bold">Links</h2>
      <ul className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
        {section.content.map(({ id }, index) => (
          <li key={id} className="contents">
            <EditableLinkPreview index={index} />
          </li>
        ))}
      </ul>
      <div className="flex flex-row justify-center">
        <Button
          onClick={() =>
            setSection({
              ...section,
              content: [
                ...section.content,
                {
                  id:
                    (section.content[section.content.length - 1]?.id ?? -1) + 1,
                  text: "",
                  href: "",
                },
              ],
            })
          }
        >
          Adicionar link
        </Button>
      </div>
    </>
  );
}

/** Properties for the {@link SectionEditDialog}. */
export interface SectionEditDialogProperties {
  /**
   * The callback to be called when the dialog is closed, receiving the new
   * modified version of the section that was being edited.
   */
  onCloseRequest: (newSection: Section) => void;
}

/**
 * A dialog to edit a section. Shows up based on {@link EditingSectionContext}.
 */
export default function SectionEditDialog({
  onCloseRequest,
}: SectionEditDialogProperties) {
  const { section } = useContext(EditingSectionContext);

  // We provide a draft section to avoid modifying the actual section until the
  // user submits the changes.
  const [draftSection, setDraftSection] = useState<Section>();

  useEffect(() => {
    setDraftSection(section ? { ...section } : undefined);
  }, [section]);

  return (
    <>
      {section != undefined && draftSection != undefined && (
        <EditingSectionContext.Provider
          value={{
            section: draftSection,
            setSection: setDraftSection,
          }}
        >
          <Modal onCloseRequest={() => onCloseRequest(section)}>
            <div className="w-full sm:max-w-[768px]">
              <Card>
                <div className="flex flex-col gap-8">
                  <section className="flex flex-col items-center gap-2">
                    <h2 className="text-lg font-bold">Título da seção</h2>
                    <TextInput
                      value={draftSection.title}
                      onChange={(value) => {
                        setDraftSection({ ...draftSection, title: value });
                      }}
                    ></TextInput>
                  </section>
                  <section className="flex flex-col gap-2">
                    <h2 className="text-center text-lg font-bold">
                      Tipo da seção
                    </h2>
                    <div className="flex flex-row justify-center gap-2">
                      <Button
                        weak={draftSection.type != "text"}
                        onClick={() =>
                          draftSection.type != "text" &&
                          setDraftSection({
                            ...draftSection,
                            type: "text",
                            content: "",
                          })
                        }
                      >
                        Texto
                      </Button>
                      <Button
                        weak={draftSection.type != "links"}
                        onClick={() =>
                          draftSection.type != "links" &&
                          setDraftSection({
                            ...draftSection,
                            type: "links",
                            content: [],
                          })
                        }
                      >
                        Links
                      </Button>
                    </div>
                  </section>
                  <section className="flex flex-col gap-2">
                    {draftSection.type == "text" && (
                      <TextEditSection></TextEditSection>
                    )}
                    {draftSection.type == "links" && (
                      <LinksEditSection></LinksEditSection>
                    )}
                  </section>
                  <div className="self-center">
                    <Button
                      onClick={() => {
                        onCloseRequest(draftSection);
                      }}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </Modal>
        </EditingSectionContext.Provider>
      )}
    </>
  );
}
