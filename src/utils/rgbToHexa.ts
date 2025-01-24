const toHexa = (x: number) => x.toString(16).padStart(2, '0')

export const rgbToHexa = ({ r, g, b }: { r: number; g: number; b: number }) =>
  `#${toHexa(r)}${toHexa(g)}${toHexa(b)}`
