export const normalizedToRGB = ({ r, g, b }: { r: number; g: number; b: number }) => ({
  r: Math.round(r * 255),
  g: Math.round(g * 255),
  b: Math.round(b * 255),
})
