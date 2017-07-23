<template class="imageDetails">
  <div class="tagList">
    <span v-for="tag in tags" v-bind:key="tag" class="tag">
      {{tag}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'tag-list',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.tagList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.tag {
  padding: 0.25em .5em;
  margin-right: .5em;
  margin-bottom: .5em;
  border: 1px solid rgba(0, 105, 255, 0.50);
  border-radius: 4px;
  font-size: .75em;
}
</style>