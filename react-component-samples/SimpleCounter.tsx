// TEST: valid component with state and an output.
// Configure: Inputs  label (string), step (number)   Outputs  countChanged
// Expected: valid, no errors. Each click sends the new count through countChanged.
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface SimpleCounterProps {
  label?: string;
  step?: number;
  onOutput?: (key: string, value: unknown) => void;
}

export default function SimpleCounter({ label = 'Counter', step = 1, onOutput }: SimpleCounterProps) {
  const [count, setCount] = useState(0);

  const change = (delta: number) => {
    const next = count + delta;
    setCount(next);
    onOutput?.('countChanged', next);
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 8,
    border: '1px solid rgba(128, 128, 128, 0.5)',
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
  } as const;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: 16 }}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <button type="button" style={buttonStyle} onClick={() => change(-step)} aria-label="Decrease">
        <Minus size={16} />
      </button>
      <span style={{ minWidth: 32, textAlign: 'center', fontSize: 20 }}>{count}</span>
      <button type="button" style={buttonStyle} onClick={() => change(step)} aria-label="Increase">
        <Plus size={16} />
      </button>
    </div>
  );
}
