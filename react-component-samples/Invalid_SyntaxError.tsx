// TEST: must be REJECTED. A tag is not closed and a bracket is missing.
// Configure: Inputs  title (string)
// Expected: error with line and column from the syntax stage; Save stays disabled.
export default function Broken({ title }: { title?: string }) {
  return (
    <div>
      <h1>{title}
      <p>Missing closing tags
  );
}
