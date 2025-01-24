<script setup lang="ts">
import { Copy } from 'lucide-vue-next'
import { ref } from 'vue'

type Props = {
  label: string
  clipboard?: string
}

const props = defineProps<Props>()

const copied = ref(false)
const handleClipboard = () => {
  if (!props.clipboard) {
    return
  }
  navigator.clipboard.writeText(props.clipboard)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="flex gap-2 items-center justify-between">
    <label class="font-bold w-16">{{ props.label }}</label>
    <slot></slot>
    <button
      v-if="clipboard"
      v-on:click="handleClipboard"
      class="relative flex items-center justify-center hover:cursor-pointer"
    >
      <Copy></Copy>
      <Transition>
        <span
          v-if="copied"
          class="absolute text-green-500 top-0 right-0 translate-x-full -translate-y-1/2"
          >Copied!</span
        >
      </Transition>
    </button>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
