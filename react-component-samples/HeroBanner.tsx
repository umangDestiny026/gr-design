import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

// Inputs to configure on the component: title (string), subtitle (string), ctaLabel (string)
// Output to configure on the component: ctaClicked
interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onOutput?: (key: string, value: unknown) => void;
}

export default function HeroBanner({
  title = 'Welcome',
  subtitle,
  ctaLabel = 'Get started',
  onOutput,
}: HeroBannerProps) {
  const [clicks, setClicks] = useState(0);

  return (
    <section style={{ padding: '48px 24px', textAlign: 'center', background: '#eef2ff' }}>
      <h1 style={{ margin: 0, fontSize: 36 }}>{title}</h1>
      {subtitle && <p style={{ marginTop: 12, fontSize: 18 }}>{subtitle}</p>}
      <button
        type="button"
        style={{ marginTop: 24, padding: '10px 20px', fontSize: 16, cursor: 'pointer' }}
        onClick={() => {
          setClicks(clicks + 1);
          onOutput?.('ctaClicked', ctaLabel);
        }}
      >
        {ctaLabel} <ArrowRight size={16} style={{ verticalAlign: 'middle' }} />
      </button>
      <p style={{ marginTop: 12, fontSize: 12, opacity: 0.6 }}>Clicked {clicks} time(s) (React version A)</p>
    </section>
  );
}
