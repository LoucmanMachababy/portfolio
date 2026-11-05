"use client";

import Link from "next/link";
import { navItems, type TableId } from "@/content/tables";

type Props = {
  open: boolean;
  onToggle: () => void;
  onNavigateTable: (id: TableId) => void;
};

export function NavMenu({ open, onToggle, onNavigateTable }: Props) {
  return (
    <nav className="nav" aria-label="Navigation principale">
      <div className="nav__brand">
        <span className="nav__mark">Auteuil</span>
        <span className="nav__name">Loucman Machababy</span>
      </div>
      <button
        type="button"
        className="nav__burger"
        aria-expanded={open}
        aria-controls="nav-panel"
        onClick={onToggle}
      >
        Menu
      </button>
      <div id="nav-panel" className={`nav__panel ${open ? "is-open" : ""}`}>
        <ul>
          {navItems.map((item) =>
            item.id ? (
              <li key={item.id}>
                <button type="button" onClick={() => onNavigateTable(item.id)}>
                  {item.label}
                </button>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </nav>
  );
}
