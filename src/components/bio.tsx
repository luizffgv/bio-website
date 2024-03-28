import { Section } from "../lib/section";
import Card from "./card";
import Photo from "./photo";
import { default as SectionComponent } from "./section";

/** Properties for the {@link Bio} component. */
export interface BioProperties {
  /** The name of the user. */
  name?: string | undefined;
  /** The URL of the user's photo. */
  imageUrl?: string | undefined;
  /** The bio's sections. */
  sections?: Section[] | undefined;
}

/** Component for rendering a user bio page. */
export default function Bio({ name, imageUrl, sections }: BioProperties) {
  return (
    <div className="flex max-w-prose flex-col items-center gap-8">
      {imageUrl && <Photo src={imageUrl}></Photo>}
      <Card>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">{name || "Página sem nome"}</h1>
          {sections?.map((section) => (
            <SectionComponent
              key={section.title}
              section={section}
            ></SectionComponent>
          ))}
        </div>
      </Card>
    </div>
  );
}
