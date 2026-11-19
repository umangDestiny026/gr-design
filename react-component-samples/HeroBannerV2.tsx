import { useState } from 'react';

// Same inputs and output as HeroBanner.tsx, with a different look. Upload it in a second environment to see that
// each environment keeps its own code.
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
    <section style={{ padding: '64px 24px', textAlign: 'left', background: '#111827', color: '#f9fafb' }}>
      <h1 style={{ margin: 0, fontSize: 44 }}>{title}</h1>
      {subtitle && <p style={{ marginTop: 12, fontSize: 20, opacity: 0.8 }}>{subtitle}</p>}
      <button
        type="button"
        style={{ marginTop: 28, padding: '12px 24px', fontSize: 16, cursor: 'pointer' }}
        onClick={() => {
          setClicks(clicks + 1);
          onOutput?.('ctaClicked', `${ctaLabel} - ${clicks}`);
        }}
      >
        {ctaLabel}
      </button>
      <p style={{ marginTop: 12, fontSize: 12, opacity: 0.6 }}>Clicked {clicks} time(s) (React version B)</p>
    </section>
  );
}
