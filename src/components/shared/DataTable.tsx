import React from "react";

export function DataTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
}) {
  return (
    <section
      aria-label={caption || "Data table"}
      className="w-full rounded-lg border border-[var(--border-structural)] bg-[var(--surface-elevated)] my-3"
    >
      {caption && (
        <div className="px-3.5 py-2.5 text-left font-mono text-[11px] font-semibold text-[var(--text-secondary)] border-b border-[var(--border-structural)] bg-[var(--surface-secondary)] rounded-t-lg break-words leading-snug">
          {caption}
        </div>
      )}

      {/* Mobile (<768px): Stacked key-value definition cards, zero clipping */}
      <div className="md:hidden divide-y divide-[var(--border-structural)]">
        {rows.map((row, rIdx) => (
          <dl key={rIdx} className="p-3.5 flex flex-col gap-2.5 min-w-0">
            {headers.map((header, cIdx) => (
              <div key={cIdx} className="flex flex-col gap-0.5 min-w-0">
                <dt className="font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider text-[10px] break-words">
                  {header}
                </dt>
                <dd
                  className={`text-xs leading-relaxed break-words [overflow-wrap:anywhere] ${
                    cIdx === 0
                      ? "font-semibold text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {row[cIdx]}
                </dd>
              </div>
            ))}
          </dl>
        ))}
      </div>

      {/* Tablet/Desktop (>=768px): Full tabular grid */}
      <div
        tabIndex={0}
        role="region"
        aria-label={caption ? `${caption} table` : "Data table scroll container"}
        className="hidden md:block w-full overflow-x-auto focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus:outline-none rounded-b-lg"
      >
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[var(--border-structural)] bg-[var(--surface-secondary)]/50">
              {headers.map((h, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className="px-3.5 py-2.5 font-mono font-semibold text-[var(--text-primary)] uppercase tracking-wider text-[10px]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-structural)]">
            {rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="hover:bg-[var(--surface-secondary)]/40 transition-colors"
              >
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`px-3.5 py-2.5 text-[var(--text-secondary)] align-top break-words ${
                      cIdx === 0 ? "font-medium text-[var(--text-primary)]" : ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
