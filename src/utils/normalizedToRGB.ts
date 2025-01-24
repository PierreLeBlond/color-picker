export const normalizedToRGB = ({ r, g, b }: { r: number; g: number; b: number }) => ({
  r: Math.floor(r * 255),
  g: Math.floor(g * 255),
  b: Math.floor(b * 255),
})
