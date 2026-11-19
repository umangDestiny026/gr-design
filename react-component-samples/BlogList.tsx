import { useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

// Props mirror the component's configured Inputs; onOutput sends its configured Outputs.
interface BlogListProps {
  title?: string;
  subtitle?: string;
  emptyText?: string;
  // The list of blog posts, normally bound to model data in the page editor
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts?: any;
  onOutput?: (key: string, value: unknown) => void;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  url: string;
  raw: unknown;
}

/** First non-empty text among the given field names. */
function pick(source: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim() !== '') {
      return value;
    }
    if (typeof value === 'number') {
      return String(value);
    }
  }
  return '';
}

/** Accepts an array, or an object with an "items" or "data" array, and maps common field names. */
function toPosts(value: unknown): Post[] {
  let list: unknown[] = [];
  if (Array.isArray(value)) {
    list = value;
  } else if (value && typeof value === 'object') {
    const holder = value as { items?: unknown; data?: unknown };
    if (Array.isArray(holder.items)) {
      list = holder.items;
    } else if (Array.isArray(holder.data)) {
      list = holder.data;
    }
  }
  return list
    .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
    .map((item, index) => ({
      id: `${pick(item, ['id', 'postId', 'slug']) || 'post'}-${index}`,
      title: pick(item, ['title', 'name', 'heading']) || 'Untitled',
      excerpt: pick(item, ['excerpt', 'summary', 'description', 'content', 'body'])
        .replace(/<[^>]+>/g, '')
        .slice(0, 160),
      image: pick(item, ['featuredImage', 'featuredimage', 'image', 'imageUrl', 'coverImage', 'thumbnail']),
      author: pick(item, ['author', 'authorName', 'createdBy']),
      date: pick(item, ['publishedDate', 'publisheddate', 'publishedAt', 'date', 'createdAt']),
      category: pick(item, ['category']),
      readTime: pick(item, ['readTime', 'readtime']),
      url: pick(item, ['url', 'link', 'href']),
      raw: item,
    }));
}

/** Short readable date, or the original text when it is not a date. */
function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogList({
  title = 'Latest Posts',
  subtitle,
  emptyText = 'No posts yet.',
  posts,
  onOutput,
}: BlogListProps) {
  const [hovered, setHovered] = useState('');
  const items = toPosts(posts);

  return (
    <section style={{ padding: '48px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', margin: 0 }}>{title}</h2>
      {subtitle && <p style={{ textAlign: 'center', opacity: 0.7, margin: '8px 0 0' }}>{subtitle}</p>}

      {items.length === 0 ? (
        <p style={{ textAlign: 'center', opacity: 0.6, marginTop: 32 }}>{emptyText}</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 24,
            marginTop: 32,
          }}
        >
          {items.map((post) => (
            <article
              key={post.id}
              onMouseEnter={() => setHovered(post.id)}
              onMouseLeave={() => setHovered('')}
              onClick={() => onOutput?.('postSelected', post.raw)}
              style={{
                border: '1px solid rgba(128, 128, 128, 0.3)',
                borderRadius: 12,
                overflow: 'hidden',
                cursor: 'pointer',
                transform: hovered === post.id ? 'translateY(-4px)' : 'none',
                boxShadow: hovered === post.id ? '0 8px 24px rgba(0, 0, 0, 0.15)' : 'none',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
                />
              )}
              <div style={{ padding: 16 }}>
                <h3 style={{ fontSize: 18, margin: '0 0 8px' }}>{post.title}</h3>
                {post.excerpt && (
                  <p style={{ fontSize: 14, opacity: 0.75, margin: '0 0 12px' }}>{post.excerpt}</p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, opacity: 0.7 }}>
                  {post.date && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={14} /> {formatDate(post.date)}
                    </span>
                  )}
                  {post.author && <span>{post.author}</span>}
                  {post.readTime && <span>{post.readTime}</span>}
                </div>
                {post.category && (
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: 10,
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      padding: '2px 8px',
                      borderRadius: 999,
                      border: '1px solid rgba(128, 128, 128, 0.4)',
                    }}
                  >
                    {post.category}
                  </span>
                )}
                {post.url && (
                  <a
                    href={post.url}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      marginTop: 12,
                      fontWeight: 600,
                      color: 'inherit',
                    }}
                  >
                    Read more stg <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
