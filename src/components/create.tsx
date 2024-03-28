import { useContext, useEffect, useRef, useState } from "react";
import Card from "./card";
import { CreateContext, EditingSectionContext } from "../contexts/create";
import TextInput from "./inputs/text-input";
import Button from "./button";
import Photo from "./photo";
import Hr from "./hr";
import SectionEditDialog from "./section-edit-dialog";
import EditableSectionPreview from "./editable-section-preview";
import { Section } from "../lib/section";

/**
 * Returns a debounced version of the value.
 *
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds.
 */
function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeout = useRef<number | null>();

  useEffect(() => {
    if (timeout.current != undefined) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      if (timeout.current != undefined) clearTimeout(timeout.current);
    };
  }, [value, delay]);

  return debouncedValue;
}

/** Button for adding a new section in {@link CreateContext}. */
function AddSectionButton() {
  const { addNewSection } = useContext(CreateContext);

  return <Button onClick={addNewSection}>Adicionar seção</Button>;
}

/** Shows the list of sections in {@link CreateContext}. */
export function SectionsSection() {
  const { sections, replaceSection } = useContext(CreateContext);
  const [currentSection, setCurrentSection] = useState<Section>();

  if (sections == undefined) throw new Error("Sections not found in context");

  return (
    <EditingSectionContext.Provider
      value={{ section: currentSection, setSection: setCurrentSection }}
    >
      <div className="flex max-h-[512px] max-w-full flex-col items-center gap-4">
        <h2 className="text-lg font-bold">Seções</h2>
        <AddSectionButton></AddSectionButton>
        <ul className="flex w-full flex-col items-center gap-4 overflow-y-auto rounded-2xl ">
          {sections.map((s) => (
            <li key={s.id}>
              <EditableSectionPreview section={s}></EditableSectionPreview>
            </li>
          ))}
        </ul>
        <SectionEditDialog
          onCloseRequest={(draft) => {
            if (currentSection == undefined)
              throw new Error(
                "Current section is undefined when closing dialog",
              );

            replaceSection(currentSection, draft);
            setCurrentSection(undefined);
          }}
        ></SectionEditDialog>
      </div>
    </EditingSectionContext.Provider>
  );
}

/** Page creation component. */
export default function Create() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const debouncedImageUrl = useDebounce(imageUrl, 750);
  const [name, setName] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([]);

  return (
    <CreateContext.Provider
      value={{
        imageUrl,
        setImageUrl,
        name,
        setName,
        sections,
        replaceSection: (old, new_) => {
          const index = sections.indexOf(old);

          setSections([
            ...sections.slice(0, index),
            { ...new_ },
            ...sections.slice(index + 1),
          ]);
        },
        removeSection(section) {
          const index = sections.indexOf(section);

          setSections([
            ...sections.slice(0, index),
            ...sections.slice(index + 1),
          ]);
        },
        addNewSection: () => {
          setSections([
            ...sections,
            {
              id: (sections[sections.length - 1]?.id ?? -1) + 1,
              title: "Seção sem nome",
              type: "text",
              content: "",
            },
          ]);
        },
      }}
    >
      <div className="flex w-full flex-col items-center gap-16 sm:max-w-[576px]">
        <h1 className="text-xl font-bold">Crie a sua própria página</h1>
        <div className="w-full">
          <Card>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 text-center">
                <div className="self-center">
                  <Photo src={debouncedImageUrl}></Photo>
                </div>
                <h2 className="text-lg font-bold">Selecione sua foto</h2>
                <label className="flex flex-col gap-2 text-center">
                  <p>Insira um link para uma imagem</p>
                  <TextInput
                    type="url"
                    value={imageUrl}
                    onChange={setImageUrl}
                  ></TextInput>
                </label>
              </div>
              <Hr />
              <label className="flex flex-col gap-2 text-center">
                <h2 className="text-lg font-bold">Qual é o seu nome?</h2>
                <TextInput value={name} onChange={setName}></TextInput>
              </label>
              <Hr />
              <SectionsSection></SectionsSection>
            </div>
          </Card>
        </div>
        <div className="flex flex-col items-center gap-4">
          Tudo pronto?
          <Button
            onClick={() => {
              let href = "/?";

              // Replace spaces with underscores to make the URL shorter
              let sectionsJSON = JSON.stringify(sections);
              sectionsJSON = sectionsJSON.replaceAll(/ |_/g, (match) =>
                match == " " ? "_" : " ",
              );
              href += `&s=${encodeURIComponent(sectionsJSON)}`;

              if (name != undefined) href += `&n=${encodeURIComponent(name)}`;
              if (imageUrl != undefined)
                href += `&i=${encodeURIComponent(imageUrl)}`;

              window.location.href = href;
            }}
          >
            Criar link
          </Button>
        </div>
      </div>
    </CreateContext.Provider>
  );
}
