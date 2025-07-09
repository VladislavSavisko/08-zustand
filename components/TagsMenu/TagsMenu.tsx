"use client";

import { useEffect, useRef, useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const menuRef = useRef<HTMLUListElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Закриття по Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        btnRef.current?.focus();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Закриття по кліку поза меню
  useEffect(() => {
    const handleClickOut = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOut);
    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  }, [isOpen]);

  return (
    <div className={css.menuContainer}>
      <button
        onClick={toggle}
        className={css.menuButton}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="tags-menu"
        ref={btnRef}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList} id="tags-menu" role="menu">
          {tags.map((tag) => (
            <li className={css.menuItem} key={tag} role="none">
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={toggle}
                role="menuitem"
              >
                {tag === "All" ? "All notes" : tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}