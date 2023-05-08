<template>
  <i :class="props.icon" class="sub-icon"></i>
  <span>{{ title }}</span>
</template>

<script lang="ts" setup>
type MenuItemProps = {
  title: string
  icon: string
}
const props = defineProps<MenuItemProps>()
</script>

<style lang="scss" scoped></style>