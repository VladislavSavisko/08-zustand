import { Metadata } from 'next';
import css from './CreateNote.module.css';
import ClientWrapper from './ClientWrapper'; // клієнтський обгортковий компонент

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

export const dynamic = 'force-dynamic';

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <ClientWrapper />
      </div>
    </main>
  );
}
