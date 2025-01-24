import { normalizedToRGB } from './normalizedToRGB'
import { rgbToHexa } from './rgbToHexa'

export const normalizedToHexa = ({ r, g, b }: { r: number; g: number; b: number }) => {
  return rgbToHexa(normalizedToRGB({ r, g, b }))
}
