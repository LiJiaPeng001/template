<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: 'center', // bottom
  },
  bgColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.7)',
  },
})

const emits = defineEmits(['update:visible', 'cancel'])

function cancel() {
  emits('update:visible', false)
  emits('cancel')
}
</script>

<template>
  <Teleport to="body">
    <div
      :class="[{ visible }, direction]"
      class="my-dialog-container"
      :style="{ backgroundColor: bgColor }"
      @click.stop="cancel"
    >
      <div class="dialog-content" @click.stop>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style lang="less" scoped>
.my-dialog-container {
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: opacity 0.3s;
  visibility: hidden;
  opacity: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  &.center {
    align-items: center;
    .dialog-content {
      opacity: 0;
      transform: scale(1.1);
    }
  }
  &.bottom {
    align-items: flex-end;
    .dialog-content {
      transform: translateY(100%);
    }
  }
  &.visible {
    visibility: visible;
    opacity: 1;
    &.center .dialog-content {
      transform: scale(1);
      transition-timing-function: cubic-bezier(0.8, 0, 0, 1.5);
      opacity: 1;
    }
    &.bottom {
      .dialog-content {
        transform: translateY(0);
      }
    }
  }
  .dialog-content {
    position: relative;
    transition: 0.3s;
  }
}
</style>
