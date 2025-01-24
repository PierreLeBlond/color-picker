export const rgbToNormalized = ({ r, g, b }: { r: number; g: number; b: number }) => ({
  r: r / 255,
  g: g / 255,
  b: b / 255,
})
