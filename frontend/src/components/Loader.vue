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
  right: 2em;
  top: 1em;
  font-size: 0.9em;
  color: rgba(0, 105, 255, 0.50);
  border: 1px solid rgba(0, 105, 255, 0.50);
  padding: 0.4em;
  border-radius: 5px;
}

</style>