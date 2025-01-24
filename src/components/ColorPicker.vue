<script setup lang="ts">
import type { Ref } from 'vue'
import InputWrapper from './InputWrapper.vue'
import { useColorConvertor } from '@/hooks/useColorConvertor'

type Props = {
  color: Ref<{
    r: number
    g: number
    b: number
  }>
}

const { color } = defineProps<Props>()

const emit = defineEmits(['colorChange'])
const { normalized, rgb, hexa, fromNormalized, fromRGB, fromHexa } = useColorConvertor({
  color,
  onColorChange: (r, g, b) => {
    console.log('emit colorChange')
    emit('colorChange', r, g, b)
  },
})
</script>

<template>
  <div class="flex gap-8">
    <div :style="{ background: hexa }" class="rounded-lg shadow-sm w-64"></div>
    <div class="flex flex-col gap-2">
      <InputWrapper label="PICK">
        <input
          class="w-16 text-end"
          type="color"
          v-on:change="(event: Event) => fromHexa((event.target as HTMLInputElement).value)"
          :value="hexa"
        />
      </InputWrapper>
      <InputWrapper label="HEXA" :clipboard="hexa">
        <input
          class="w-16 text-end"
          type="text"
          v-on:change="(event: Event) => fromHexa((event.target as HTMLInputElement).value)"
          :value="hexa"
        />
      </InputWrapper>
      <InputWrapper label="RGB" :clipboard="rgb.text">
        <input
          class="w-8 text-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          step="1"
          min="0"
          max="255"
          v-on:change="
            (event: Event) =>
              fromRGB({ r: Number((event.target as HTMLInputElement).value), g: rgb.g, b: rgb.b })
          "
          :value="rgb.r"
        />
        <input
          class="w-8 text-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          step="1"
          min="0"
          max="255"
          v-on:change="
            (event: Event) =>
              fromRGB({ r: rgb.r, g: Number((event.target as HTMLInputElement).value), b: rgb.b })
          "
          :value="rgb.g"
        />
        <input
          class="w-8 text-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          step="1"
          min="0"
          max="255"
          v-on:change="
            (event: Event) =>
              fromRGB({ r: rgb.r, g: rgb.g, b: Number((event.target as HTMLInputElement).value) })
          "
          :value="rgb.b"
        />
      </InputWrapper>
      <InputWrapper label="GLSL" :clipboard="normalized.text">
        <input
          class="w-8 text-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          step="0.01"
          min="0"
          max="1"
          v-on:change="
            (event: Event) =>
              fromNormalized({
                r: Number((event.target as HTMLInputElement).value),
                g: normalized.g,
                b: normalized.b,
              })
          "
          :value="normalized.r"
        />
        <input
          class="w-8 text-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          step="0.01"
          min="0"
          max="1"
          v-on:change="
            (event: Event) =>
              fromNormalized({
                r: normalized.r,
                g: Number((event.target as HTMLInputElement).value),
                b: normalized.b,
              })
          "
          :value="normalized.g"
        />
        <input
          class="w-8 text-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          step="0.01"
          min="0"
          max="1"
          v-on:change="
            (event: Event) =>
              fromNormalized({
                r: normalized.r,
                g: normalized.g,
                b: Number((event.target as HTMLInputElement).value),
              })
          "
          :value="normalized.b"
        />
      </InputWrapper>
    </div>
  </div>
</template>
