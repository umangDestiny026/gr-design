import axios from 'axios';
import { useState } from 'react';

// This file is broken on purpose, to see the error panel:
// - axios is not an allowed package
// - useStat is a typo
// - 'clicked' is not a configured output
// - eval is not allowed
export default function BrokenBanner({ title }: { title?: string }) {
  const [count, setCount] = useStat(0);
  eval('1 + 1');
  return (
    <button onClick={() => onOutput?.('clicked', count)}>
      {title} {String(axios)}
    </button>
  );
}
