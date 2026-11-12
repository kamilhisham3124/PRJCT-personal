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
    <div className="w-full overflow-x-auto rounded-lg border border-[var(--border-structural)] bg-[var(--surface-elevated)] my-3">
      <table className="w-full text-left border-collapse text-xs">
        {caption && (
          <caption className="px-3.5 py-2 text-left font-mono text-[11px] font-semibold text-[var(--text-secondary)] border-b border-[var(--border-structural)] bg-[var(--surface-secondary)]">
            {caption}
          </caption>
        )}
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
                  className={`px-3.5 py-2.5 text-[var(--text-secondary)] ${
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
  );
}
