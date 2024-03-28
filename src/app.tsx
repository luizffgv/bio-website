import { useState } from "react";
import Bio from "./components/bio";
import Create from "./components/create";
import { Section } from "./lib/section";

/** Component for rendering the app. */
export default function App() {
  const [parameters] = useState(() => {
    const raw = new URLSearchParams(window.location.search);

    if (raw.size === 0) return;

    return {
      imageUrl: raw.get("i") ?? undefined,
      name: raw.get("n") ?? undefined,
      about: raw.get("a") ?? undefined,
      sections: raw.get("s") ?? undefined,
    };
  });

  let sections: Section[] = [];
  if (parameters?.sections != undefined) {
    try {
      // Spaces and underscores are replaced to make the URL shorter
      parameters.sections = parameters.sections.replaceAll(/ |_/g, (match) =>
        match == " " ? "_" : " ",
      );
      const parsed = JSON.parse(parameters.sections);
      if (!Array.isArray(parsed)) throw new Error("Sections is not an array");
      sections = parsed;
    } catch (error) {
      console.error(`Failed to parse sections: ${error}`);
    }
  }

  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center bg-stone-900 px-4 py-8 text-stone-50 sm:px-8">
      {parameters == undefined ? (
        <Create></Create>
      ) : (
        <Bio
          name={parameters.name}
          sections={sections}
          imageUrl={parameters.imageUrl}
        ></Bio>
      )}
    </div>
  );
}
