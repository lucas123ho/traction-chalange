export function getFirstLetters(text: string): string[] {
  const words = text.split(' ');

  return words.map(word => word.charAt(0));
}