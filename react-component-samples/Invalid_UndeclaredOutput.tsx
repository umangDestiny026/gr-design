// TEST: must be REJECTED. Sends an output key that is not configured.
// Configure: Inputs  label (string)   Outputs  clicked   (do NOT add "unknownKey")
// Expected: GC-OUTPUT-001 for "unknownKey", with an "Add to outputs" button.
// "clicked" is configured but never sent, so also a warning GC-OUTPUT-003.
interface Props {
  label?: string;
  onOutput?: (key: string, value: unknown) => void;
}

export default function UndeclaredOutput({ label = 'Press', onOutput }: Props) {
  return (
    <button type="button" onClick={() => onOutput?.('unknownKey', label)}>
      {label}
    </button>
  );
}
