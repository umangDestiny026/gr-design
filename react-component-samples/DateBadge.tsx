// TEST: component that uses a package the application added (dayjs 1.11.13).
// Add the package first: application settings -> Packages -> dayjs, version 1.11.13 -> Save.
// Configure before uploading:
//   Inputs   label (Text), date (Text, for example 2026-11-04)
//   Outputs  dateClicked
// Expected:
//   without the package: error GC-IMPORT-001 for "dayjs"
//   with the package:    valid, no warnings
// In the app and in the editor preview: shows the date in a long format, how long ago or from now it is, and sends the
// date through dateClicked when the badge is clicked. Change the date input to see the text change.
import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface DateBadgeProps {
  label?: string;
  date?: string;
  onOutput?: (key: string, value: unknown) => void;
}

export default function DateBadge({ label = 'Published', date, onOutput }: DateBadgeProps) {
  const [clicks, setClicks] = useState(0);
  // An empty or unreadable date shows today, so the component always has something to show
  const parsed = date && dayjs(date).isValid() ? dayjs(date) : dayjs();

  return (
    <button
      type="button"
      onClick={() => {
        setClicks(clicks + 1);
        onOutput?.('dateClicked', parsed.format('YYYY-MM-DD'));
      }}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 4,
        padding: '12px 16px',
        border: '1px solid rgba(128, 128, 128, 0.4)',
        borderRadius: 10,
        background: 'transparent',
        color: 'inherit',
        textAlign: 'left',
        cursor: 'pointer',
        font: 'inherit',
      }}
    >
      <span style={{ fontSize: 12, opacity: 0.7 }}>{label}</span>
      <strong style={{ fontSize: 18 }}>{parsed.format('dddd, D MMMM YYYY')}</strong>
      <span style={{ fontSize: 13, opacity: 0.8 }}>{parsed.fromNow()}</span>
      <span style={{ fontSize: 11, opacity: 0.55 }}>Clicked {clicks} time(s)</span>
    </button>
  );
}
