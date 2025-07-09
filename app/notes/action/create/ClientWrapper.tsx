'use client';

import dynamic from 'next/dynamic';

// Динамічний імпорт з SSR false (тільки в клієнтському компоненті!)
const NoteFormWrapper = dynamic(() => import('./NoteFormWrapper'), {
  ssr: false,
});

export default function ClientWrapper() {
  return <NoteFormWrapper onClose={() => { /* Дія при закритті */ }} />;
}
