"use client";

import { createPortal } from "react-dom";
import { useEffect, ReactNode, useRef } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ children, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const focusedElement = useRef<HTMLElement | null>(null);

  // Закриття по натисканню Escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Блокування скролу
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Закриття по кліку на фон
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  // Управління фокусом
  useEffect(() => {
    focusedElement.current = document.activeElement as HTMLElement;
    modalRef.current?.focus();
    return () => {
      focusedElement.current?.focus();
    };
  }, []);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div
        className={css.modal}
        ref={modalRef}
        tabIndex={-1}
        aria-label="Modal content"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}