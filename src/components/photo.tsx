/** Properties for the {@link Photo} component. */
export interface PhotoProperties {
  /** The URL of the image. */
  src?: string | undefined;
}

/** Shows a profile image. */
export default function Photo({ src }: PhotoProperties) {
  return (
    <div className="flex h-32 w-32 flex-col items-center justify-center overflow-hidden rounded-full border-4 border-blue-500">
      {src && <img src={src} alt="Imagem de perfil" className="object-cover" />}
    </div>
  );
}
