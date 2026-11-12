"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    [items[0]?.id || ""]: true,
  });

  const toggle = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col border border-[var(--border-structural)] rounded-lg divide-y divide-[var(--border-structural)] bg-[var(--surface-elevated)] overflow-hidden">
      {items.map((item) => {
        const isOpen = Boolean(openItems[item.id]);
        return (
          <div key={item.id} className="flex flex-col">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              className="flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors min-h-[44px]"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200 shrink-0 ml-2 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div
                id={`accordion-content-${item.id}`}
                role="region"
                className="p-4 pt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--surface-primary)]/40 border-t border-[var(--border-structural)]"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
