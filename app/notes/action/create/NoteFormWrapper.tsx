'use client';

import { useRouter } from 'next/navigation';
import NoteForm from '@/components/NoteForm/NoteForm';

type NoteFormWrapperProps = {
  onClose?: () => void;
};

export default function NoteFormWrapper({ onClose }: NoteFormWrapperProps) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push('/notes');
    }
  };

  return <NoteForm onClose={handleClose} />;
}
