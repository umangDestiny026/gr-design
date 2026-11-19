// TEST: valid component that calls an outside API from the browser and sends an output when a row is clicked.
// Configure before uploading (Configuration section of the panel):
//   Inputs   title (Text), limit (Number)
//   Outputs  postClicked
// Expected: valid, with ONE WARNING GC-NET-001 about fetch. The warning does not block saving.
// In the app: the list loads from a public test API, the limit input changes how many rows load, and clicking a row
// sends the whole post through the postClicked output (bind it to a flow or an event handler on the page).
import { useEffect, useState } from 'react';

interface ApiDataListProps {
  title?: string;
  limit?: number;
  onOutput?: (key: string, value: unknown) => void;
}

interface ApiPost {
  id: number;
  title: string;
  body: string;
}

export default function ApiDataList({ title = 'Posts from an API', limit = 5, onOutput }: ApiDataListProps) {
  const [items, setItems] = useState<ApiPost[]>([]);
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // A limit that is missing, not a number or below one falls back to the default, so a wrong value cannot break the call
  const count = Number.isFinite(limit) && limit >= 1 ? Math.min(Math.floor(limit), 100) : 5;

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${count}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`The API answered ${response.status}`);
        }
        return response.json();
      })
      .then((data: ApiPost[]) => {
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
          setStatus('done');
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('error');
        }
      });
    return () => {
      cancelled = true;
    };
  }, [count]);

  return (
    <section style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      {status === 'loading' && <p style={{ opacity: 0.7 }}>Loading...</p>}
      {status === 'error' && <p style={{ opacity: 0.7 }}>The data could not be loaded.</p>}
      {status === 'done' && items.length === 0 && <p style={{ opacity: 0.7 }}>No posts to show.</p>}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setSelectedId(item.id);
              onOutput?.('postClicked', item);
            }}
            style={{
              padding: 12,
              border: selectedId === item.id ? '2px solid currentColor' : '1px solid rgba(128, 128, 128, 0.3)',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            <strong>{item.title}</strong>
            <p style={{ margin: '4px 0 0', fontSize: 14, opacity: 0.75 }}>{item.body}</p>
          </li>
        ))}
      </ul>
      {selectedId !== null && <p style={{ marginTop: 12, fontSize: 12, opacity: 0.6 }}>Sent post {selectedId} through postClicked.</p>}
    </section>
  );
}
