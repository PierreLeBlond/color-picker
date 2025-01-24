const toNormalized = (hexa: string) => Number((parseInt(hexa, 16) / 255).toFixed(2))

export const hexaToNormalized = (hexa: string) => ({
  r: toNormalized(hexa.substring(1, 3)),
  g: toNormalized(hexa.substring(3, 5)),
  b: toNormalized(hexa.substring(5, 7)),
})
