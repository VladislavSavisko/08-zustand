'use client';

import { useRouter } from 'next/navigation';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NoteFormWrapper() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/notes');
  };

  return <NoteForm onClose={handleClose} />;
}
