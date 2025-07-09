import { Metadata } from 'next';
import dynamicImport from 'next/dynamic'; // перейменовано тут!
import css from './CreateNote.module.css';

// SEO мета-дані
export const metadata: Metadata = {
  title: 'Create',
  description: 'Creating new note',
  openGraph: {
    title: 'Create',
    description: 'Creating new note',
    url: 'https://08-zustand-lyart.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Creating new note',
      },
    ],
  },
};

// Позначаємо, що сторінка динамічна
export const dynamic = 'force-dynamic';

// Динамічний імпорт клієнтського компонента
const NoteFormWrapper = dynamicImport(() => import('./NoteFormWrapper'), {
  ssr: false,
});

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteFormWrapper onClose={() => { /* Дія при закритті */ }} />
      </div>
    </main>
  );
}
