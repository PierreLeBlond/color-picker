<script setup lang="ts">
import { watch } from 'vue'
import ColorPicker from './components/ColorPicker.vue'
import { useEncodingConvertor } from './hooks/useEncodingConvertor'
import { normalizedToHexa } from './utils/normalizedToHexa'

const encodingConvertor = useEncodingConvertor()

watch(encodingConvertor.raw, () => {
  console.log({ raw: encodingConvertor.raw })
})

watch(encodingConvertor.toneMapped, () => {
  console.log({ toneMapped: encodingConvertor.toneMapped })
})

watch(encodingConvertor.gammaEncoded, () => {
  console.log({ gammaEncoded: encodingConvertor.gammaEncoded })
})
</script>

<template>
  <header
    class="h-48 w-screen flex items-center justify-center font-bold text-[10rem]"
    :style="{ color: normalizedToHexa(encodingConvertor.gammaEncoded.value) }"
  >
    COLOR PICKER
  </header>
  <main class="grow flex flex-col justify-center items-center gap-8">
    <ColorPicker
      :color="encodingConvertor.raw"
      @colorChange="encodingConvertor.fromRaw"
      label="RAW"
    ></ColorPicker>
    <ColorPicker
      :color="encodingConvertor.toneMapped"
      @colorChange="encodingConvertor.fromToneMapped"
      label="TONEMAP"
    ></ColorPicker>
    <ColorPicker
      :color="encodingConvertor.gammaEncoded"
      @colorChange="encodingConvertor.fromGammaEncoded"
      label="GAMMA"
    ></ColorPicker>
  </main>
</template>
