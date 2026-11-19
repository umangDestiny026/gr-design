// TEST: must be REJECTED when only "title" is configured. It reads "subtitle", which is not an input and has no default.
// Configure: Inputs  title (string)   (do NOT add subtitle)
// Expected: GC-INPUT-002 for subtitle, with an "Add to inputs" button. After pressing it (or adding subtitle
// as a string input) the file becomes valid.
interface Props {
  title?: string;
  subtitle?: string;
}

export default function UnconfiguredProp({ title, subtitle }: Props) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
