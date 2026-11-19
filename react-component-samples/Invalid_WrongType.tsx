// TEST: must be REJECTED. "count" is configured as a number but typed as a string here.
// Configure: Inputs  count (number)
// Expected: GC-INPUT-003 (prop type does not match the configured type).
interface Props {
  count?: string;
}

export default function WrongType({ count = '0' }: Props) {
  return <p>Count: {count}</p>;
}
