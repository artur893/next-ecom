const MS_PER_DAY = 24 * 60 * 60 * 1000;

const formatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
});

export function getEstimatedDeliveryRange(): string {
  const startOffset = 1 + Math.floor(Math.random() * 7);
  const start = new Date(Date.now() + startOffset * MS_PER_DAY);
  const end = new Date(start.getTime() + 3 * MS_PER_DAY);

  return `${formatter.format(start)} - ${formatter.format(end)}`;
}
