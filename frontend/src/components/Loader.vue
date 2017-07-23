<template>
  <div v-if="show" class="loader">
    Loading...
  </div>
</template>

<script>
export default {
  name: 'loader',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.loader {
  position: fixed;
  color: rgba(0, 105, 255, 0.50);
  right: 1em;
  font-size: 0.9em;
}

</style>