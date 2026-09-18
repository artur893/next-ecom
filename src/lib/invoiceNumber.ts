function randomSegment(length: number) {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length)
    .toUpperCase();
}

export function generateInvoiceNumber(): string {
  const date = new Date();
  const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;

  return `INV/${datePart}/TSR/${randomSegment(4)}-${randomSegment(3)}`;
}
