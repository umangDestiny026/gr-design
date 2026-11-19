// TEST: must be REJECTED. The component is exported by name only.
// Configure: Inputs  title (string)
// Expected: GC-EXPORT-001 (no default export).
export function NamedOnly({ title = 'Hi' }: { title?: string }) {
  return <h1>{title}</h1>;
}
