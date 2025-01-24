import { computed, ref } from 'vue'

const toneMap = (x: number) => x / (x + 1)
const untoneMap = (x: number) => (x < 1 ? x / (1 - x) : 10000)

const gammaEncode = (x: number) => Math.pow(x, 1 / 2.2)
const gammaDecode = (x: number) => Math.pow(x, 2.2)

export const useEncodingConvertor = () => {
  const hdr = ref({
    r: 1.0,
    g: 1.0,
    b: 1.0,
  })

  const normalized = computed(() => {
    const intensity = Math.max(hdr.value.r, hdr.value.g, hdr.value.b, 1.0)
    return {
      r: hdr.value.r / intensity,
      g: hdr.value.g / intensity,
      b: hdr.value.b / intensity,
      intensity,
    }
  })

  const toneMapped = computed(() => {
    return {
      r: toneMap(hdr.value.r),
      g: toneMap(hdr.value.g),
      b: toneMap(hdr.value.b),
    }
  })

  const gammaEncoded = computed(() => ({
    r: gammaEncode(toneMapped.value.r),
    g: gammaEncode(toneMapped.value.g),
    b: gammaEncode(toneMapped.value.b),
  }))

  const fromHDR = ({ r, g, b }: { r: number; g: number; b: number }) => {
    hdr.value = { r, g, b }
  }

  const fromNormalized = ({
    r,
    g,
    b,
    intensity,
  }: {
    r: number
    g: number
    b: number
    intensity: number
  }) => {
    fromHDR({
      r: r * intensity,
      g: g * intensity,
      b: b * intensity,
    })
  }

  const fromToneMapped = ({ r, g, b }: { r: number; g: number; b: number }) => {
    fromHDR({
      r: untoneMap(r),
      g: untoneMap(g),
      b: untoneMap(b),
    })
  }

  const fromGammaEncoded = ({ r, g, b }: { r: number; g: number; b: number }) => {
    fromToneMapped({
      r: gammaDecode(r),
      g: gammaDecode(g),
      b: gammaDecode(b),
    })
  }

  return {
    hdr,
    normalized,
    gammaEncoded,
    toneMapped,
    fromHDR,
    fromNormalized,
    fromToneMapped,
    fromGammaEncoded,
  }
}
