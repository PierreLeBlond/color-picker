<script setup lang="ts">
import ColorPicker from './components/ColorPicker.vue'
import { useEncodingConvertor } from './hooks/useEncodingConvertor'
import { normalizedToHexa } from './utils/normalizedToHexa'
import InputWrapper from './components/InputWrapper.vue'

const encodingConvertor = useEncodingConvertor()
</script>

<template>
  <header
    class="h-48 w-screen flex items-center justify-center font-bold text-[10rem]"
    :style="{ color: normalizedToHexa(encodingConvertor.gammaEncoded.value) }"
  >
    COLOR PICKER
  </header>
  <main class="grow flex flex-col justify-center items-center gap-8">
    <InputWrapper label="HDR">
      <input
        class="w-40 text-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        step="0.01"
        min="0"
        max="10000"
        v-on:change="
          (event: Event) =>
            encodingConvertor.fromHDR({
              r: Number((event.target as HTMLInputElement).value),
              g: encodingConvertor.hdr.value.g,
              b: encodingConvertor.hdr.value.b,
            })
        "
        :value="encodingConvertor.hdr.value.r"
      />
      <input
        class="w-40 text-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        step="0.01"
        min="0"
        max="10000"
        v-on:change="
          (event: Event) =>
            encodingConvertor.fromHDR({
              r: encodingConvertor.hdr.value.r,
              g: Number((event.target as HTMLInputElement).value),
              b: encodingConvertor.hdr.value.b,
            })
        "
        :value="encodingConvertor.hdr.value.g"
      />
      <input
        class="w-40 text-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        step="0.01"
        min="0"
        max="10000"
        v-on:change="
          (event: Event) =>
            encodingConvertor.fromHDR({
              r: encodingConvertor.hdr.value.r,
              g: encodingConvertor.hdr.value.g,
              b: Number((event.target as HTMLInputElement).value),
            })
        "
        :value="encodingConvertor.hdr.value.b"
      />
    </InputWrapper>
    <InputWrapper label="INTENSITY">
      <input
        class="ml-16 w-40 text-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        step="0.01"
        min="0"
        max="10000"
        v-on:change="
          (event: Event) =>
            encodingConvertor.fromNormalized({
              r: encodingConvertor.normalized.value.r,
              g: encodingConvertor.normalized.value.g,
              b: encodingConvertor.normalized.value.b,
              intensity: Number((event.target as HTMLInputElement).value),
            })
        "
        :value="encodingConvertor.normalized.value.intensity"
      />
    </InputWrapper>
    <ColorPicker
      :color="encodingConvertor.normalized"
      @colorChange="
        ({ r, g, b }) =>
          encodingConvertor.fromNormalized({
            r,
            g,
            b,
            intensity: encodingConvertor.normalized.value.intensity,
          })
      "
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
