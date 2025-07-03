// utils/colorMap.ts
export const colorMap: Record<string, string> = {
  Red: '#FF0000',
  Blue: '#0000FF',
  Green: '#008000',
  Yellow: '#FFFF00',
  Pink: '#FFC0CB',
  Black: '#000000',
  White: '#FFFFFF',
  Orange: '#FFA500',
  Gray: '#808080',
  Purple: '#800080',
  Brown: '#A52A2A',
  Navy: '#000080',
  GreenYellow: '#ADFF2F',
};

export function getColorHex(color: string): string {
  return colorMap[color] || '#CCC'; // fallback gray
}
