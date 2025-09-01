export function formatContact(input: string): string {
  // SG numbers format
  return input.replace(/(.{4})/g, '$1 ').trim();
}
