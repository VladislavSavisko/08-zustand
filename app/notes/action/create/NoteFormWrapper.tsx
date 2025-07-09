'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import { CreateNote, TagType } from '@/types/note';
import css from './NoteForm.module.css';

type NoteFormProps = {
  onClose: () => void;
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [errors, setErrors] = useState<Partial<Record<keyof CreateNote, string>>>({});

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] }); // додано ключ
      clearDraft();
      onClose();
    },
    onError: (error) => {
      console.error('Failed to create note:', error);
      alert('Failed to create note. Please try again.');
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setDraft({ ...draft, [name]: value });
  };

  const handleSubmit = (formData: FormData) => {
    const newErrors: typeof errors = {};

    if (!draft.title || draft.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (draft.title && draft.title.length > 50) {
      newErrors.title = 'Title must not exceed 50 characters';
    }

    if (draft.content && draft.content.length > 500) {
      newErrors.content = 'Content must not exceed 500 characters';
    }

    if (!['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'].includes(draft.tag)) {
      newErrors.tag = 'Invalid tag selected';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const newNote: CreateNote = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as TagType,
    };

    mutate(newNote);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          required
          value={draft.title}
          id="title"
          type="text"
          name="title"
          onChange={handleChange}
          className={css.input}
        />
        {errors.title && <div className={css.error}>{errors.title}</div>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={draft.content}
          onChange={handleChange}
          className={css.textarea}
        />
        {errors.content && <div className={css.error}>{errors.content}</div>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <div className={css.error}>{errors.tag}</div>}
      </div>

      <div className={css.actions}>
        <button onClick={onClose} type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
