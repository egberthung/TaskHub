export function formatDateID(dateStr?: string) {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  if (date.getFullYear() === 1) return "-";

  return date.toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
