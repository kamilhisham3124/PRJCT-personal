const MONTH_YEAR_FMT = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const DAY_MONTH_YEAR_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const TIMESTAMP_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "UTC",
});

function parseUtcDate(input: string | Date): Date | null {
  if (input instanceof Date) {
    return Number.isNaN(input.getTime()) ? null : input;
  }
  const trimmed = input.trim();
  if (!trimmed) return null;

  const yearMonthMatch = /^(\d{4})-(\d{2})$/.exec(trimmed);
  if (yearMonthMatch) {
    const year = Number(yearMonthMatch[1]);
    const month = Number(yearMonthMatch[2]);
    if (month < 1 || month > 12) return null;
    return new Date(Date.UTC(year, month - 1, 1));
  }

  const isoDateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoDateMatch) {
    const year = Number(isoDateMatch[1]);
    const month = Number(isoDateMatch[2]);
    const day = Number(isoDateMatch[3]);
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    return new Date(Date.UTC(year, month - 1, day));
  }

  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(trimmed)) {
    return null;
  }

  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function partsMap(
  formatter: Intl.DateTimeFormat,
  date: Date
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of formatter.formatToParts(date)) {
    if (part.type !== "literal") {
      out[part.type] = part.type === "month" && part.value === "Sept"
        ? "Sep"
        : part.value;
    }
  }
  return out;
}

export function formatMonthYear(input: string | Date): string {
  const date = parseUtcDate(input);
  if (!date) return typeof input === "string" ? input : "";
  const parts = partsMap(MONTH_YEAR_FMT, date);
  return `${parts.month} ${parts.year}`;
}

export function formatDayMonthYear(input: string | Date): string {
  const date = parseUtcDate(input);
  if (!date) return typeof input === "string" ? input : "";
  const parts = partsMap(DAY_MONTH_YEAR_FMT, date);
  return `${parts.day} ${parts.month} ${parts.year}`;
}

export function formatCommitDate(input: string | Date): string {
  return formatDayMonthYear(input);
}

export function formatDateRange(
  start: string | Date,
  end: string | Date | null | undefined,
  granularity: "month" | "day" = "month"
): string {
  const fmt = granularity === "day" ? formatDayMonthYear : formatMonthYear;
  const startLabel = fmt(start);
  const endLabel = end ? fmt(end) : "Present";
  return `${startLabel} \u2013 ${endLabel}`;
}

export function formatAbsoluteTimestamp(input: string | Date): string {
  const date = parseUtcDate(input);
  if (!date) return typeof input === "string" ? input : "";
  const parts = partsMap(TIMESTAMP_FMT, date);
  return `${parts.day} ${parts.month} ${parts.year}, ${parts.hour}:${parts.minute} UTC`;
}
