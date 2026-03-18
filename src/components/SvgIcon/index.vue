<template>
  <svg :style="mergedStyle" aria-hidden="true" :title="name">
    <use :xlink:href="symbolId" fill="currentColor" />
  </svg>
</template>

<script setup name="SvgIcon">
import { computed } from "vue";

const props = defineProps({
  iconStyle: {
    type: Object,
    default: () => ({ width: "100px", height: "100px" })
  },
  prefix: {
    type: String,
    default: "icon"
  },
  name: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: ""
  }
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);

const mergedStyle = computed(() => ({
  ...props.iconStyle,
  ...(props.color ? { color: props.color } : {})
}));
</script>
