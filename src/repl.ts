export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}
