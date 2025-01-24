import { hexaToNormalized } from '@/utils/hexaToNormalized'
import { normalizedToRGB } from '@/utils/normalizedToRGB'
import { rgbToHexa } from '@/utils/rgbToHexa'
import { rgbToNormalized } from '@/utils/rgbToNormalized'
import { computed, ref, watch, type Ref } from 'vue'

export const useColorConvertor = (args: {
  color: Ref<{ r: number; g: number; b: number }>
  onColorChange: (r: number, g: number, b: number) => void
}) => {
  const normalized = ref({
    r: args.color.value.r,
    g: args.color.value.g,
    b: args.color.value.b,
    text: `vec3(${args.color.value.r}, ${args.color.value.g}, ${args.color.value.b})`,
  })

  watch(args.color, (newColor) => {
    normalized.value = {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
      text: `vec3(${newColor.r}, ${newColor.g}, ${newColor.b})`,
    }
  })

  const rgb = computed(() => {
    const { r, g, b } = normalizedToRGB(normalized.value)
    const text = `rgb(${r}, ${g}, ${b})`
    return { r, g, b, text }
  })

  const hexa = computed(() => {
    return rgbToHexa(rgb.value)
  })

  const fromNormalized = ({ r, g, b }: { r: number; g: number; b: number }) => {
    normalized.value = { r, g, b, text: `vec3(${r}, ${g}, ${b})` }
    args.onColorChange(r, g, b)
  }

  const fromRGB = ({ r, g, b }: { r: number; g: number; b: number }) => {
    fromNormalized(rgbToNormalized({ r, g, b }))
  }

  const fromHexa = (hexa: string) => {
    fromNormalized(hexaToNormalized(hexa))
  }

  return {
    normalized,
    rgb,
    hexa,
    fromNormalized,
    fromRGB,
    fromHexa,
  }
}
