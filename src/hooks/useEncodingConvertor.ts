import { computed, ref } from 'vue'

const toneMap = (x: number) => x / (x + 1)
const untoneMap = (x: number) => x / (1.001 - x)

const gammaEncode = (x: number) => Math.pow(x, 1 / 2.2)
const gammaDecode = (x: number) => Math.pow(x, 2.2)

export const useEncodingConvertor = () => {
  const raw = ref({
    r: 1.0,
    g: 1.0,
    b: 1.0,
  })

  const toneMapped = computed(() => {
    return {
      r: toneMap(raw.value.r),
      g: toneMap(raw.value.g),
      b: toneMap(raw.value.b),
    }
  })

  const gammaEncoded = computed(() => ({
    r: gammaEncode(toneMapped.value.r),
    g: gammaEncode(toneMapped.value.g),
    b: gammaEncode(toneMapped.value.b),
  }))

  const fromRaw = (r: number, g: number, b: number) => {
    raw.value = { r, g, b }
  }

  const fromToneMapped = (r: number, g: number, b: number) => {
    raw.value = {
      r: untoneMap(r),
      g: untoneMap(g),
      b: untoneMap(b),
    }
  }

  const fromGammaEncoded = (r: number, g: number, b: number) => {
    raw.value = {
      r: untoneMap(gammaDecode(r)),
      g: untoneMap(gammaDecode(g)),
      b: untoneMap(gammaDecode(b)),
    }
  }

  return {
    raw,
    gammaEncoded,
    toneMapped,
    fromRaw,
    fromToneMapped,
    fromGammaEncoded,
  }
}
