// TEST: must be REJECTED. Uses eval and new Function.
// Configure: Inputs  title (string)
// Expected: GC-API-001 (twice: eval, new Function).
export default function UsesEval({ title = 'Hi' }: { title?: string }) {
  const result = eval('1 + 1');
  const make = new Function('return 2');
  return (
    <h1>
      {title} {String(result)} {String(make())}
    </h1>
  );
}
